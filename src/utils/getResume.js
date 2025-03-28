import { authenticate } from "@/middlewares/authMiddleware";
import { NextResponse } from "next/server";

export async function getResume() {
    try {
        const authResponse = await authenticate();
        if(authResponse instanceof NextResponse) return authResponse;

        const { user } = authResponse;
        const resumeLink = user.career.resume
    
        console.log(resumeLink)
        return resumeLink    
    } catch (error) {
        console.log("Fetching PDF from:", resumeLink);
    }
}