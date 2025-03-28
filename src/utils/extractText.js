import axios from "axios";
import pdf from "pdf-extraction"

export async function extractText(resumeURI) {
    try {
        console.log("Fetching resume...");
        const response = await axios.get(resumeURI, { responseType: "arraybuffer" });

        if (!response.data) throw new Error("No data received from the resume URL.");

        console.log("Extracting text...");
        const pdfData = await pdf(response.data);
        return pdfData.text || "No text extracted.";

    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        return null;
    }
}
