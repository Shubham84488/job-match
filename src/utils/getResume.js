import { authenticate } from "@/middlewares/authMiddleware";

export async function getResume() {
    try {
        console.log("hi")
        const authResponse = await authenticate("asda");

        if(authResponse instanceof NextResponse) return authResponse;
        console.log("bye")
        const { user } = authResponse;
        const resumeLink = user.career.resume
    
        return resumeLink    
    } catch (error) {
        console.log("Fetching PDF from:", resumeLink);
    }
}