"use client"

import React, { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Electrolize } from 'next/font/google';

const electro = Electrolize({subsets:["latin"], weight:['400']})

const Jobs = () => {
    const [jobData, setJobData] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // Initialize loading state
    const postsPerPage = 5;
    const router = useRouter()

    const [filters, setFilters] = useState({
        profile: "",
        location: "",
        company: "",
    });

    const handleShow = (id) => {
        router.push(`/job/${id}`);
    };    

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true); // Start loading
                const response = await axios.get("/api/jobseekers/jobs");
                setJobData(response.data);
                setFilteredJobs(response.data || []);
            } catch (error) {
                console.log("Some error occurred: " + error);
            } finally {
                setLoading(false); // Stop loading
            }
        }
        fetchJobs();
    }, []);
    

    const handleInputChange = (e) => {
        setFilters({ ...filters, [e.target.id]: e.target.value });
    };
    
      // Apply Filters
      const applyFilters = () => {
        const filtered = jobData.filter((job) => {
            return (
                (filters.profile === "" || (job.title?.toLowerCase().includes(filters.profile.toLowerCase()))) &&
                (filters.location === "" || (job.location?.toLowerCase().includes(filters.location.toLowerCase()))) &&
                (filters.company === "" || (job.company?.toLowerCase().includes(filters.company.toLowerCase())))
            );
        });
    
        setFilteredJobs(filtered);
        setCurrentPage(1); // Reset pagination when filtering
    };
    

    const lastPostIndex = currentPage * postsPerPage;
    const startPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredJobs.slice(startPostIndex, lastPostIndex); // Use currentPosts
    
    return (
        <div className='p-6'>
            <div>
                <h1 className={`text-5xl ${electro.className} font-extrabold`}>Jobs</h1>
            </div>
            <br />

            <div className='min-h-screen flex relative'>
                <div className="w-1/3 border-2 p-6 rounded-lg h-fit sticky top-4 left-0 bg-white shadow-lg">
                    <h2 className="text-center text-2xl font-bold text-blue-800">Filters</h2>

                    <div className="mt-4">
                        <label htmlFor="profile" className="text-blue-900 font-semibold block">
                        Profile
                        </label>
                        <input
                            type="text"
                            id="profile"
                            value={filters.profile ?? ""}
                            onChange={handleInputChange}
                            className="border w-full p-2 rounded-md"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="location" className="text-blue-900 font-semibold block">
                        Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={filters.location ?? ""}
                            onChange={handleInputChange}
                            className="border w-full p-2 rounded-md"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="company" className="text-blue-900 font-semibold block">
                        Company
                        </label>
                        <input
                            type="text"
                            id="company"
                            value={filters.company ?? ""}
                            onChange={handleInputChange}
                            className="border w-full p-2 rounded-md"
                        />
                    </div>

                    <button
                        type="button"
                        className="bg-blue-600 w-full mt-4 px-4 py-2 text-white rounded-xl hover:bg-blue-700 transition-all"
                        onClick={applyFilters}
                    >
                        Apply Filters
                    </button>
                </div>

                <div className="border-2 ml-16 w-3/4 h-fit min-h-96 mr-44">
                    {loading ? (  
                        <div className="text-center text-3xl mt-10 font-light">Loading jobs...</div>
                    ) : (
                        <div>
                            {currentPosts.map((job, index) => (
                                <div key={index} className="bg-white shadow-lg border border-gray-300 rounded-xl p-6 m-4 transition-transform hover:scale-[1.02]">
                                    <p className="text-lg font-bold">{job.title}</p>
                                    <p className="font-light text-base">{job.company}</p>
                                    <div className="flex gap-3 mt-2">
                                        <div className="flex gap-1">
                                            <Image src="/icons8-location-50.png" width={24} height={14} alt="location" />
                                            <p>{job.location}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <Image src="/icons8-experience-50.png" width={24} height={14} alt="exp" />
                                            <p>{job.experience} years</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <Image src="/icons8-money-32.png" width={24} height={14} alt="sal" />
                                            <p>{job.minSalary?.toLocaleString("en-IN")}-{job.maxSalary?.toLocaleString("en-IN")}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <div className="flex gap-3">
                                            {job.skills?.slice(0,3).map((skill,index)=>(
                                                <p className="skills" key={index}>{skill}</p>
                                            ))}
                                        </div>
                                        <div>
                                            <button className="font-bold p-2 px-4 text-white bg-blue-500 rounded-xl hover:bg-blue-700 flex gap-2"
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
                    )}
                </div>
            </div>
        </div>
    );
}

export default Jobs;
