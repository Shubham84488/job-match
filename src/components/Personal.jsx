import React from 'react';
import { useProfile } from '../context/ProfileContext'; // Import context

const Personal = () => {
  const { profileData, updateProfile } = useProfile(); // Use context

  return (
    <div className='flex md:flex-row w-full mt-7 mx-7'>
      <div className='w-1/2'>
        <h3>Personal Details</h3>
        <p className='font-extralight'>Update your personal details.</p>
      </div>

      <div className='border-2 shadow-md w-full p-4 mr-16 rounded-lg'>
        <div>
          <label htmlFor="fullname" className='mt-3 text-blue-900'>Full Name</label>
          <input 
            type="text"
            id='fullname'
            value={profileData.personal.fullname} // Corrected path
            onChange={(e) => updateProfile('personal','fullname', e.target.value)}
            className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
          />
        </div>

        <div className='flex'>
          <div className='flex-row w-full mr-2'>
            <label htmlFor="email" className='mt-3 text-blue-900'>Email</label>
            <input 
              type="email"
              id='email'
              value={profileData.personal.email} // Corrected path
              onChange={(e) => updateProfile('personal','email', e.target.value)}
              className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
            />
          </div>

          <div className='flex-row w-full ml-2'>
            <label htmlFor="phone" className='mt-3 text-blue-900'>Phone Number</label>
            <input 
              type="number"
              id='phone'
              value={profileData.personal.phone} // Corrected path
              onChange={(e) => updateProfile('personal','phone', e.target.value)}
              className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
            />
          </div>
        </div>

        <div className='flex'>
          <div className='flex-row w-full mr-2'>
            <label htmlFor="state" className='mt-3 text-blue-900'>Current State</label>
            <input 
              type="text"
              id='state'
              value={profileData.personal.state} // Corrected path
              onChange={(e) => updateProfile('personal','state', e.target.value)}
              className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
            />
          </div>

          <div className='flex-row w-full ml-2'>
            <label htmlFor="city" className='mt-3 text-blue-900'>Current City</label>
            <input 
              type="text"
              id='city'
              value={profileData.personal.city} // Corrected path
              onChange={(e) => updateProfile('personal','city', e.target.value)}
              className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
            />
          </div>
        </div>

        <div>
          <label htmlFor="whatsapp" className='mt-3 text-blue-900'>WhatsApp Number</label>
          <input 
            type="number"
            id='whatsapp'
            value={profileData.personal.whatsapp} // Corrected path
            onChange={(e) => updateProfile('personal','whatsapp', e.target.value)}
            className='bg-gray-200 block w-full my-3 rounded-lg p-2' 
          />
        </div>
      </div>
    </div>
  );
}

export default Personal;
