import { GoogleGenerativeAI } from "@google/generative-ai";

const apikey=process.env.GOOGLE_GENERATIVE_AI
const genAi= new GoogleGenerativeAI(apikey);

export async function evaluate(jd,resumeText){
    try {
        const model = genAi.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `
            Compare the following resume with the given job description and provide:
            1. A percentage match score.
            2. Missing keywords from the resume.
            3. A short summary of the resume.

            Job Description: ${jd}
            Resume Text: ${resumeText}
        `;

        const response = await model.generateContent(prompt);
        return response.response.text();
    } catch (error) {
        console.log("Some error Occured: "+ error)  
    }
}