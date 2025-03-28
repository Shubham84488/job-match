import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import recruiterModel from "@/models/recruiterModel";
import jobModel from "@/models/jobModel";
import { connect } from "@/dbconfig/dbconfig";

connect()

export async function GET(request) {
    try {
        const cookiestore =await cookies();
        const token = cookiestore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const email = decoded.email;

        const recruiter = await recruiterModel.findOne({ email });
        if (!recruiter) {
            return NextResponse.json({ message: "Recruiter not found" }, { status: 404 });
        }
        const jobPostIds = recruiter.jobPosts;
        if(jobPostIds.length == 0){
            return NextResponse.json(null,{status:200})
        }

        const jobPosts = await Promise.all(jobPostIds.map(async (jobId) => await jobModel.findById(jobId)));

        return NextResponse.json(jobPosts, { status: 200 });
    } catch (error) {
        console.error("Error fetching job posts:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
