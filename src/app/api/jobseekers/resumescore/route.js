import { NextResponse } from "next/server";
import { evaluate } from "@/utils/gemini";
import { getResume } from "@/utils/getResume";
import { extractText } from "@/utils/extractText";

export async function POST(request){
    try {
        const { skills } = await request.json();
        const skillString = skills.join(", ");
        const resumeURI = await getResume()
        const resumeText = await extractText(resumeURI);
        
        const evaluateResult = await evaluate(resumeText, skillString)
        console.log(evaluateResult)
        return NextResponse.json(evaluateResult,{status:200})

    } catch (error) {
        return NextResponse.json({error:"Error"},{status:500})
    }
}