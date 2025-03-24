import { NextResponse } from "next/server"
import jobModel from "@/models/jobModel"
import recruiter from "@/models/recruiterModel"
import userModel from "@/models/userModel"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function POST(request){
    try {
        const req = await request.json()
        const { jobid } = req;

        const cookie = await cookies()
        const token = cookie.get("token")?.value

        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const email = decoded.email;

        const user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({error: "No user found"} , {status: 404})
        }
        
        const job = await jobModel.findById(jobid)
        
        if(!job.applicants.includes(user._id)){
            job.applicants.push(user._id);
        }

        if(!user.appliedJobs.some(applied => applied.jobId.toString() === jobid)){
            user.appliedJobs.push({ jobId: jobid, company: job.company });
        }

        await job.save();
        await user.save();

        return NextResponse.json({ message: "Job applied successfully"}, { status: 201 });

    } catch (error) {
        return NextResponse.json({error:"Some error occurred"}, {status:500})
    }
}