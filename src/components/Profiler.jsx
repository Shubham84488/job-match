import React,{useState} from 'react'
import Personal from './Personal'
import Education from './Education'
import Career from './Career'
import {useProfile } from '@/context/ProfileContext';  // Import Context
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast';

const Profiler = () => {
    const [details, setDetails] = useState("personal");
    const {handleedit } = useProfile(); // Use context

  return (
    <div>
        <Toaster/>
        <header className='flex justify-between mx-7 my-2'>
          <div>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='text-lg font-light'>Update Personal, Education & Career Details</p>
          </div>
          <div className='flex justify-end mt-3 mr-9'>
            <button
                onClick={handleedit }
                className='rounded-md bg-blue-500 text-white px-7 py-2'>
                Edit
            </button>
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
  )
}

export default Profiler
