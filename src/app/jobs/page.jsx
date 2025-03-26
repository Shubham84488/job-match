"use client"

import React, { useState, useEffect } from 'react'
import data from '@/data/data'
import Pagination from '@/components/Pagination';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Jobs = () => {
    const [jobData, setJobData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const router = useRouter();

    const handleShow = (id) => {
        router.push(`/job/${id}`);
    };
    

    useEffect(() => {
        try {
            async function fetchJobs(){
                const response = await axios.get("/api/jobseekers/jobs")
                setJobData(response.data)
            }
            fetchJobs()
        } catch (error) {
            console.log("Some error occurred"+error)
        }
        console.log(jobData)
        setJobData(data)
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const startPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = jobData.slice(startPostIndex, lastPostIndex); // Use currentPosts
    return (
        <div className='p-6'>
            <div>
                <h1 className='text-5xl'>Jobs</h1>
            </div>
            <br />

            <div className='min-h-screen flex relative'>
                <div className='w-1/3 border-2 p-4 rounded-lg h-fit sticky top-4 left-0'>
                    <h2 className='text-center text-2xl'>Filters</h2>
                    <div>
                        <label htmlFor="profile" className='mt-3 text-blue-900'>Profile</label>
                        <input type="text" id='profile' className='filter-input' />
                    </div>
                    <div>
                        <label htmlFor="location" className='mt-3 text-blue-900'>Location</label>
                        <input type="text" id='location' className='filter-input' />
                    </div>
                    <div>
                        <label htmlFor="company" className='mt-3 text-blue-900'>Company</label>
                        <input type="text" id='company' className='filter-input' />
                    </div>

                    <button type="submit" className='bg-blue-600 px-4 py-2 text-white rounded-xl hover:bg-blue-700'>
                        Save
                    </button>
                </div>

                <div className='border-2 mx-16 w-3/4 mr-44'>
                    <div>
                        {currentPosts.map((job, index) => (  // Use currentPosts
                            <div key={index} className='border-2 m-5 rounded-xl p-4'>
                                <p className='text-lg font-bold'>{job.title}</p>
                                <p className='font-light text-base'>{job.company}</p>
                                <div className='flex gap-3 mt-2'>
                                    <div className='flex gap-1'>
                                        <Image src="/icons8-location-50.png" width={24} height={14} alt='location'></Image>
                                        <p>{job.location}</p>
                                    </div> {/* Fixed incorrect key */}
                                    <div className='flex gap-1'>
                                        <Image src="/icons8-experience-50.png" width={24} height={14} alt='exp'></Image>
                                        <p>{job.experience} years</p>
                                    </div>
                                    <div className='flex gap-1'>
                                        <Image src="/icons8-money-32.png" width={24} height={14} alt='sal'></Image>
                                        <p>{job.minSalary?.toLocaleString("en-IN")}-{job.maxSalary?.toLocaleString("en-IN")}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between mt-4'>
                                    <div className='flex gap-3'>
                                        {job.skills?.slice(0,3).map((skill,index)=>(
                                            <p className='skills' key={index}>{skill}</p>
                                        ))}
                                    </div>
                                    <div>
                                        <button className='font-bold p-2 px-4 text-white bg-blue-500 rounded-xl hover:bg-blue-700 flex gap-2'
                                            onClick={() => handleShow(job._id)}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Pagination 
                            totalPosts={jobData.length} 
                            postsPerPage={postsPerPage} 
                            setCurrentPage={setCurrentPage} 
                            currentPage={currentPage} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jobs;
