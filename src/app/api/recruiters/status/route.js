import { connect } from "@/dbconfig/dbconfig";
import jobseeker from "@/models/userModel";
import { NextResponse } from "next/server";

connect()

export async function POST(request){
    try {
        const req = await request.json();
        const { status,applicantId,jobId } = req;
        console.log(status,applicantId,jobId)

        const user = await jobseeker.findById(applicantId)

        user.appliedJobs.find(applied => applied.jobId.toString() === jobId).status = status;
        await user.save()

        return NextResponse.json({message: "Job status updated successfully"},{status:200})

    } catch (error) {
        return NextResponse.json({message: "Error updating job status"},{status:500})
    }
}