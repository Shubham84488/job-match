"use client"
import React,{useRef} from 'react';
import { useProfile } from '../context/ProfileContext'; // Import the context
import axios from 'axios';

const Career = () => {
  const { profileData, updateProfile,handleedit  } = useProfile(); // Get state and updater function
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    
    if (!file) {
      alert("No file selected!");
      return;
    }else{
      console.log(file)
    }
    
    const formdata= new FormData();
    formdata.append('resume', file);
    console.log(formdata.get("resume"))

    try {
      const response = await axios.post("/api/jobseekers/resume",formdata,{
        headers: {"Content-Type":"multipart/form-data"},
      })
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <div className='flex md:flex-row w-full mt-7 mx-7'>
        <div className='w-1/2'>
          <h3>Career Details</h3>
          <p className='font-extralight'>Update the details below required by our partner companies.</p>
        </div>

        <div className='border-2 shadow-md w-full p-4 mr-16 rounded-lg'>

          {/* LinkedIn & GitHub URLs */}
          <div className='flex'>
            <div className='flex-row w-full mr-2'>
              <label htmlFor="ldnurl" className='mt-3 text-blue-900'>LinkedIn URL</label>
              <input 
                type="url" 
                id='ldnurl' 
                value={profileData.career.linkedin || ""} 
                onChange={(e) => updateProfile("career", "linkedin", e.target.value)}
                className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
              />
            </div>

            <div className='flex-row w-full ml-2'>
              <label htmlFor="giturl" className='mt-3 text-blue-900'>GitHub URL</label>
              <input 
                type="url" 
                id='giturl' 
                value={profileData.career.github || ""}
                onChange={(e) => updateProfile("career", "github", e.target.value)}
                className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
              />
            </div>
          </div>

          {/* Expected & Current CTC */}
          <div className='flex'>
            <div className='flex-row w-full mr-2'>
              <label htmlFor="ectc" className='mt-3 text-blue-900'>Expected CTC</label>
              <input 
                type="number" 
                id='ectc'
                value={profileData.career.expectedCTC || ""}
                onChange={(e) => updateProfile("career", "expectedCTC", e.target.value)}
                className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
              />
            </div>  

            <div className='flex-row w-full ml-2'>
              <label htmlFor="cctc" className='mt-3 text-blue-900'>Current CTC</label>
              <input 
                type="number" 
                id='cctc'
                value={profileData.career.currentCTC || ""}
                onChange={(e) => updateProfile("career", "currentCTC", e.target.value)}
                className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
              />
            </div>   
          </div>

          {/* Joining Time & Experience */}
          <div className='flex'>
            <div className='flex-row w-full mr-2'>
              <label htmlFor="join" className='mt-3 text-blue-900'>How soon can you join</label>
              <input 
                type="text" 
                id='join' 
                value={profileData.career.joiningTime || ""}
                onChange={(e) => updateProfile("career", "joiningTime", e.target.value)}
                className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
              />
            </div>

            <div className='flex-row w-full ml-2'>
              <label htmlFor="experience" className='mt-3 text-blue-900'>Work Experience</label>
              <select 
                id="experience"
                value={profileData.career.experience || "0 years"}
                onChange={(e) => updateProfile("career", "experience", e.target.value)}
                className="bg-gray-200 block w-full my-3 rounded-lg p-2"
              >
                <option value="0 years">0 years</option>
                <option value="1 years">1 years</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="3+ years">3+ years</option>
              </select>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <p className="text-blue-900">Resume</p>
            <div className="bg-gray-200 block w-full my-3 rounded-lg p-2 text-end">
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              {/* Button to Trigger File Input */}
              <div className='flex justify-between'>
                <p>{profileData.career.resume || ""}</p>
                <button
                  className="p-2 mr-2 bg-blue-400 rounded-lg text-white hover:bg-blue-500"
                  onClick={handleButtonClick}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
  );
};

export default Career;
