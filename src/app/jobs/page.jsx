"use client"

import React from 'react'
import data from '@/data/data'

const Jobs = () => {
  return (
    <div>
        <div>
            <h1 className='text-5xl'>Jobs</h1>
        </div>
        <br />

        <div className='min-h-screen flex relative'>
            <div className='w-1/3 border-2 p-4 rounded-lg h-fit sticky top-0 left-0'>
                <h2 className='text-center text-2xl'>Filters</h2>
                <div>
                    <label htmlFor="profile" className='mt-3 text-blue-900'>Profile</label>
                    <input type="text" 
                        id='profile'
                        className='bg-gray-200 block w-full mb-3 rounded-lg p-2' 
                    />
                </div>
                <div>
                    <label htmlFor="location" className='mt-3 text-blue-900'>Location</label>
                    <input type="text" 
                        id='location'
                        className='bg-gray-200 block w-full mb-3 rounded-lg p-2' 
                    />
                </div>
                <div>
                    <label htmlFor="company" className='mt-3 text-blue-900'>Company</label>
                    <input type="text" 
                        id='company'
                        className='bg-gray-200 block w-full mb-3 rounded-lg p-2' 
                    />
                </div>

                <button 
                    type="submit" 
                    className='bg-blue-600 px-4 py-2 text-white rounded-xl hover:bg-blue-700'
                    >
                    Save
                </button>
                
            </div>


            <div className='border-2 mx-16 w-3/4 mr-44'>
                <div>
                    {data.map((job,index)=>(
                        <div key={index}
                            className='border-2 m-5 rounded-xl p-4'
                        >
                            <p>{job.title}</p>
                            <p>{job.company}</p>
                            <div>
                                <p>{job.Location}</p>
                                <p>{job.experience}</p>
                                <p>{job.income}</p>
                            </div>
                            <div>

                            </div>
                        </div>
                    ))} 
                </div>
            </div>

        </div>

    </div>
    
  )
}

export default Jobs
