import React from 'react';
import { useProfile } from '@/context/ProfileContext'; 

const Education = () => {
  const { profileData, updateProfile,handleedit  } = useProfile();

  return (
    <div>
        <div className='flex md:flex-row w-full mt-7 mx-7'>
          <div className='w-1/2'>
            <h3>Education Details</h3>
            <p className='font-extralight'>Update your Education details.</p>
          </div>
          <div className='border-2 shadow-md w-full p-4 mr-16 rounded-lg'>
            <div>
              <label htmlFor="college" className='mt-3 text-blue-900'>College Name</label>
              <input 
                type="text" 
                id='college'
                value={profileData.education?.college || ""}
                onChange={(e) => updateProfile("education", "college", e.target.value)}
                className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
              />
            </div>

            <div>
              <label htmlFor="gradyear" className='mt-3 text-blue-900'>Graduation Year</label>
              <input 
                type="number" 
                id='gradyear'
                value={profileData.education?.gradyear || ""}
                onChange={(e) => updateProfile("education", "gradyear", e.target.value)}
                className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
              />
            </div>

            <div className='flex'>
              <div className='flex-row w-full mr-2'>
                <label htmlFor="degree" className='mt-3 text-blue-900'>Degree</label>
                <input 
                  type="text" 
                  id='degree'
                  value={profileData.education?.degree || ""}
                  onChange={(e) => updateProfile("education", "degree", e.target.value)}
                  className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
                />
              </div>
              
              <div className='flex-row w-full ml-2'>
                <label htmlFor="dept" className='mt-3 text-blue-900'>Department</label>
                <input 
                  type="text" 
                  id='dept'
                  value={profileData.education?.dept || ""}
                  onChange={(e) => updateProfile("education", "dept", e.target.value)}
                  className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
                />
              </div>     
            </div>

            <div>
              <label htmlFor="jobstatus" className="mt-3 text-blue-900">Job Status</label> 
              <select 
                id="jobstatus"
                value={profileData.education?.jobStatus || ""}
                onChange={(e) => updateProfile("education", "jobStatus", e.target.value)}
                className="bg-gray-200 block w-full my-3 rounded-lg p-2"
              >
                <option value="student">Student</option>
                <option value="working">Working Professional</option>
                <option value="graduate">Graduate (Currently Unemployed)</option>
              </select>
            </div>
          </div>
        </div>
    </div>
    
  )
}

export default Education;
