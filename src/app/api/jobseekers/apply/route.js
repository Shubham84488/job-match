import { NextResponse } from "next/server"
import jobModel from "@/models/jobModel"
import { authenticate } from "@/middlewares/authMiddleware"

export async function POST(request){
    try {
        const req = await request.json()
        const { jobid } = req;

        const authresponse = await authenticate()
        if(authresponse instanceof NextResponse){
            return authresponse
        }
        const {user} = authresponse
        console.log(user.career.resume)

        if(user.career.resume == ""){
            return new NextResponse({message: "No resume found"}, { status: 400 })
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