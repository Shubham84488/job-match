"use client"
import React, { useEffect, useState } from 'react';
import { Montserrat,Lora } from 'next/font/google';
import axios from 'axios';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Toaster,toast } from 'react-hot-toast';

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600"] });
const lora = Lora({ subsets: ["latin"], weight: ["400"] });

const MyApplication = () => {
  const [myJobs,setMyJobs] = useState([])
  const [reports, setReports] = useState({})

  useEffect(() => {
    const storedReports = localStorage.getItem("resumeScores");
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);


  const handleRes=async(jobId,skills)=>{
    try {
      console.log(skills)
      const response =await axios.post("/api/jobseekers/resumescore",{skills: skills})
      
      setReports((prevReports) => ({
        ...prevReports,
        [jobId]: response.data, 
      }));
      toast.success("Score Provided")
      const updatedReports = {
        ...reports,
        [jobId]: response.data,
      };

      setReports(updatedReports);
      localStorage.setItem("resumeScores", JSON.stringify(updatedReports)); 
    } catch (error) {
      console.log("some error happened "+error)
    }
  }

  useEffect(()=>{
      const fetchJobs=async()=>{
        try {
          const response= await axios.get("/api/jobseekers/application")
          const data=response.data
          setMyJobs(data) 
        } catch (error) {
          console.log("Some error happened "+error)
        }
      }
      fetchJobs()
  },[])
  return (
    <div className="m-6 p-4">
      <Toaster/>
      <header className="bg-gray-200 shadow-md p-4">

        <h1 className={`text-center text-blue-600 pt-4 text-4xl font-bold italic ${montserrat.className}`}>My Applications</h1>
      </header>
      <div className="flex justify-center p-6 mt-6 ">
          <table className="text-center p-6 w-11/12 border border-gray-400 rounded-xl">

          <thead className="bg-gray-300">
            <tr >
              <th className="px-4 py-2">COMPANY</th>
              <th className="px-4 py-2">PROFILE</th>
              <th className="px-4 py-2">APPLIED ON</th>
              <th className="px-4 py-2">STATUS</th>
              <th className="px-4 py-2">RESUME SCORE</th>
            </tr>
          </thead>
          <tbody>
            {myJobs.map((job, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">

                <td className="px-6 py-3">{job.company}</td>
                <td className="flex justify-center gap-2 px-6 py-3">
                  {job.title} {" "} 
                  <Link href={`/job/${job.jobId}`}>
                    <ExternalLink className='opacity-60 hover:opacity-80' color='blue'/>
                  </Link>
                </td>
                <td className="px-6 py-3">
                  {new Date(job.appliedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-3">{job.status}</td>
                <td className="px-6 py-3">
                  <button onClick={() => handleRes(job?.jobId, job?.skills)} 
                    className='bg-blue-600 px-2 py-1 rounded-md text-white hover:opacity-90'
                    >
                    Get Score: {reports[job.jobId] || "N/A"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplication;
