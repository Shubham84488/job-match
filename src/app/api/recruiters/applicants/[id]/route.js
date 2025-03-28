import { NextResponse } from "next/server";
import jobModel from "@/models/jobModel";
import jobseeker from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { extractText } from "@/utils/extractText";
import { evaluate } from "@/utils/gemini";

connect()

export async function GET(req) {
    try {
        const url = new URL(req.url)
        const jobid = url.pathname.split("/").pop();

        const job = await jobModel.findById(jobid)
        const applicantsId = job.applicants
        if(applicantsId.length == 0) {
            return NextResponse.json(null,{status:200})
        }

        const jobseekers =await Promise.all(applicantsId.map(async (applicant)=> await jobseeker.findById(applicant)))
        return NextResponse.json(jobseekers,{status:200})
        
    } catch (error) {
        console.error("Error fetching job posts:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const req = await request.json();

        const { applicantId } = req; 
        console.log(applicantId);

        // Get job ID from the URL
        const url = new URL(request.url)
        const jobid = url.pathname.split("/").pop();

        // Fetch the job and applicant from the database
        const job = await jobModel.findById(jobid);
        if (!job) {
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        }

        const applicant = await jobseeker.findById(applicantId);
        if (!applicant) {
            return NextResponse.json({ message: "Applicant not found" }, { status: 404 });
        }

        const skills = job.skills.join(",");
        console.log(skills)
        const resumetext =await extractText(applicant?.career?.resume || "");

        const evaluationResult =await evaluate(resumetext, skills);
        console.log(evaluationResult)

        return NextResponse.json(evaluationResult, { status: 200 });

    } catch (error) {
        console.error("Error processing application:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}