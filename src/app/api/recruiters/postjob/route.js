import { NextResponse } from "next/server";
import Job from "@/models/jobModel";
import Recruiter from "@/models/recruiterModel";
import { connect } from "@/dbconfig/dbconfig";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connect();

export async function POST(request) {
    try {
        const req = await request.json();

        // Get token from cookies
        const cookie = await cookies()
        const token=cookie.get('token')?.value; 
        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const email = decoded.email;

        // Find recruiter
        const recruiter = await Recruiter.findOne({ email });
        if (!recruiter) {
            return NextResponse.json({ error: "Recruiter not found" }, { status: 404 });
        }

        // Create a new job
        const newJob = await Job.create({
            ...req,  
            recruiterId: recruiter._id,  
        });

        // Update recruiter's jobPosts array
        await Recruiter.findByIdAndUpdate(recruiter._id, { 
            $push: { jobPosts: newJob._id } 
        });

        return NextResponse.json({ message: "Job posted successfully", job: newJob }, { status: 201 });

    } catch (error) {
        console.log("Error posting job:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
