"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SignUp = () => {

  const [user,setUser]= useState({
    "name":"",
    "email":"",
    "password":""
  })

  const handlesubmit=async()=>{
    try {
      const response = await axios.post("/api/users/signup",user)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600'>
      <div className='flex-row  border-2 p-6 bg-gray-200 rounded-[20px] lg:w-1/4 md:w-2/5 h-2/3 shadow-lg shadow-black'>
        <h1 className='text-2xl font-extrabold text-center mb-5'>
            Login
        </h1>

        
        <label htmlFor='name' className='text-lg'>Name</label><br />
        <input 
            type='text'
            id='name'
            onChange={(e)=>setUser({...user,name:e.target.value})}
            className=' border-black border-[2px] rounded-md mb-4 w-full p-2'
            >
        </input>
        <br />

        <label htmlFor="emailId" className='text-lg'>Email ID </label><br />
        <input 
            type='text'
            id='emailId'
            onChange={(e)=>setUser({...user,email:e.target.value})}
            className=' border-black border-[2px] rounded-md mb-4 w-full p-2'
            >
        </input>

        <br />
        <label htmlFor="password" className='text-lg'>Password</label><br />
        <input 
            type="password" 
            id='password'
            onChange={(e)=>setUser({...user,password:e.target.value})}
            className=' border-black border-[2px] rounded-md mb-4 w-full p-2'
            />

        <br />
        <button 
            type="submit"
            className="p-2 text-lg font-semibold border-2 border-purple-700 rounded-lg block w-full mt-3 
             bg-purple-500 text-white transition-all duration-300 hover:bg-purple-600 hover:shadow-md"
            onClick={handlesubmit}
            >
            Submit
        </button>


      </div>
    </div>
  )
}

export default SignUp
