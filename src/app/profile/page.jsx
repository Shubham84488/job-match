"use client";

import Career from '@/components/Career';
import Education from '@/components/Education';
import Personal from '@/components/Personal';
import React, { useState } from 'react';
import { ProfileProvider } from '@/context/ProfileContext';  // Import Context

const Profile = () => {
  const [details, setDetails] = useState("personal");

  return (
    <ProfileProvider>
      <div>
        <header className='flex justify-between mx-7 my-2'>
          <div>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='text-lg font-light'>Update Personal, Education & Career Details</p>
          </div>
          <div className='mt-3'>
            <button className='rounded-md bg-blue-500 text-white px-7 py-1'>Edit</button>
          </div>
        </header>

        <hr className='w-full my-8' />

        <div className='flex w-fit border-2 mb-2 p-2 rounded-md bg-gray-200 mx-7'>
          <button className={`text-base rounded-lg p-1 w-64 font-medium text-center ${details === "personal" ? "bg-white border-2" : ""}`}
            onClick={() => setDetails("personal")}
          >
            <p>Personal Details</p>
          </button>
          <button className={`text-base rounded-lg p-1 w-72 font-medium text-center ${details === "education" ? "bg-white border-2" : ""}`}
            onClick={() => setDetails("education")}
          >
            <p>Education Details</p>
          </button>
          <button className={`text-base rounded-lg p-1 w-72 font-medium text-center ${details === "career" ? "bg-white border-2" : ""}`}
            onClick={() => setDetails("career")}
          >
            <p>Career Details</p>
          </button>
        </div>

        <div>
          {details === "personal" ? <Personal /> : details === "education" ? <Education /> : <Career />}
        </div>
      </div>
    </ProfileProvider>
  );
}

export default Profile;
