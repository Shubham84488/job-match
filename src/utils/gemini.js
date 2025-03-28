import { GoogleGenerativeAI } from "@google/generative-ai";

const apikey = process.env.GOOGLE_GENERATIVE_AI;

if (!apikey) {
  throw new Error("Google Generative AI API key is missing.");
}

const genAi = new GoogleGenerativeAI(apikey);

export async function evaluate(resumeText, skills) {
  try {
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Compare the following resume with the given job description and provide:
      only the percentage only score

      Job Description: ${skills}
      Resume Text: ${resumeText}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error evaluating resume:", error);
    return null;
  }
}
