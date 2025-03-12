"use client"
import React,{useState} from 'react'
import axios from 'axios';

const page = () => {

    const [resume, setResume] = useState(null);
    const handlefilechange=(e)=>{
        setResume(e.target.files[0])
    }

    const handlesubmit=async()=>{
        if (!resume) {
            alert("Please select a resume file.");
            return;
          }
      
          const formData = new FormData();
          formData.append("resume", resume);
      
          try {
            const response = await axios.post("/api/jobseekers/resume", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
      
            console.log("Upload successful:", response.data);
            alert("Resume uploaded successfully!");
          } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed. Please try again.");
          }
    }

  return (
    <div className='flex-col'>
      <label htmlFor="resume">Resume</label><br />
      <input type="file" accept='.pdf,.docx' onChange={handlefilechange}/><br />
      <button type="submit">submit</button>
    </div>
  )
}

export default page
