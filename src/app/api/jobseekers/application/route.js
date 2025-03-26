import { NextResponse } from "next/server";
import jobModel from "@/models/jobModel";
import { authenticate } from "@/middlewares/authMiddleware";

export async function GET(request) {
    try {
        const authResponse = await authenticate(request);
        if (authResponse instanceof NextResponse) return authResponse;

        const { user } = authResponse;

        // Extract job IDs from user's appliedJobs
        const jobIds = user.appliedJobs.map(job => job.jobId);

        // Fetch job details from jobModel based on jobIds
        const jobs = await jobModel.find({ _id: { $in: jobIds } });

        // Map jobs with user-specific details (company, status, appliedAt)
        const appliedJobs = user.appliedJobs.map(job => {
            const jobDetail = jobs.find(j => j._id.toString() === job.jobId.toString());
            return {
                jobId: job.jobId,
                title: jobDetail?.title || "Unknown",
                company: job.company,
                status: job.status,
                appliedAt: job.appliedAt,
            };
        });

        return NextResponse.json(appliedJobs, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Some error occurred" }, { status: 500 });
    }
}
