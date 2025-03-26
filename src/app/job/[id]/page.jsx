"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation"; 

const JobDetails = () => {
  const { id } = useParams(); 
  const [job, setJob] = useState(null);

  const handleApply=async()=>{
    try {
        const response = await axios.post('/api/jobseekers/apply', { jobid: job?._id });
        toast.success("Job Applied")
        console.log(response);
    } catch (error) {
        console.log("Some Error occured: ",error);
    }
  }

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobseekers/job/${id}`);
        setJob(response.data);
      } catch (error) {
        console.log("Error fetching job details:", error);
      }
    };
    if (id) fetchJob();
  }, [id]);

  if (!job) {
    return <p className="text-center text-lg">Loading job details...</p>;
  }

  return (
    <div className="container mx-auto p-6 border-2 border-black w-2/3 rounded-2xl mt-6">
      <Toaster/>
      <h1 className="text-3xl font-bold">{job?.title}</h1>
      <p className="text-lg text-gray-600">{job?.company} - {job?.location}</p>
      <p className="mt-4"><strong>Salary:</strong> {job?.minSalary?.toLocaleString("en-IN")} - {job?.maxSalary?.toLocaleString("en-IN")}</p>
      <p className="mt-4 font-bold">Experience : {job?.experience} years</p>
      <p className="mt-4"><strong>Responsibilities:</strong></p>
      <ul className="list-disc ml-6">
        {job?.responsibilities?.map((res, index) => (
          <li key={index}>{res}</li>
        ))}
      </ul>
      <p className="mt-4"><strong>Skills Required:</strong></p>
      <div className="flex gap-3">
        {job?.skills?.map((skill,index)=>(
            <p className='skills' key={index}>{skill}</p>
        ))}
      </div>

      <div>
        <p className="text-lg font-bold mt-4">Job Description:</p>
        <p className="text-gray-600">{job?.companyDescription}</p>
      </div>
      <button className='font-bold p-2 px-4 mt-4 text-white bg-blue-500 rounded-xl hover:bg-blue-700 flex gap-2'
            onClick={() => handleApply(job._id)}
            >
            Apply Now
        </button>
    </div>
  );
};

export default JobDetails;
