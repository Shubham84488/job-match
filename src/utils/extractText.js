import axios from "axios"
import pdfParse from "pdf-parse"

export async function extractText(resumeLink) {
    try {
        const response = await axios.get(resumeLink,{responseType:"arraybuffer"})
        const data= await pdfParse(response.data);
        return data.text

    } catch (error) {
        console.log(error)
    }
}