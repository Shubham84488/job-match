"use client"
import React, { useEffect, useState } from 'react';
import { Montserrat, Lora } from 'next/font/google';
import axios from 'axios';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600"] });
const lora = Lora({ subsets: ["latin"], weight: ["400"] });

const MyApplication = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [reports, setReports] = useState({});

  useEffect(() => {
    const storedReports = localStorage.getItem("resumeScores");
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);

  const handleRes = async (jobId, skills) => {
    try {
      console.log(skills);
      const response = await axios.post("/api/jobseekers/resumescore", { skills: skills });

      const updatedReports = {
        ...reports,
        [jobId]: response.data,
      };

      setReports(updatedReports);
      localStorage.setItem("resumeScores", JSON.stringify(updatedReports));
      toast.success("Score Provided");
    } catch (error) {
      console.log("Some error happened " + error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/jobseekers/application");
        setMyJobs(response.data);
      } catch (error) {
        console.log("Some error happened " + error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Toaster />
      <header className="bg-gray-100 shadow-lg p-6 rounded-lg">
        <h1 className={`text-center text-blue-700 text-4xl font-bold italic drop-shadow-md ${montserrat.className}`}>
          My Applications
        </h1>
      </header>
      <div className="overflow-hidden rounded-lg shadow-lg mt-6">
        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
          <thead className="bg-gray-300 text-gray-800">
            <tr>
              <th className="p-4 text-left">COMPANY</th>
              <th className="p-4 text-left">PROFILE</th>
              <th className="p-4 text-left">APPLIED ON</th>
              <th className="p-4 text-left">STATUS</th>
              <th className="p-4 text-left">RESUME SCORE</th>
            </tr>
          </thead>
          <tbody>
            {myJobs.map((job, index) => (
              <tr
                key={index}
                className={`border-t transition-all ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
              >
                <td className="p-4">{job.company}</td>
                <td className="p-4 flex items-center gap-2">
                  <Link href={`/job/${job.jobId}`} className="text-blue-600 hover:underline flex items-center pt-2">
                    {job.title} <ExternalLink className="ml-1 opacity-70 hover:opacity-100" size={16} />
                  </Link>
                </td>
                <td className="p-4">
                  {new Date(job.appliedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded text-white text-md font-semibold ${
                      job.status === "pending"
                        ? "bg-yellow-500"
                        : job.status === "shortlisted"
                        ? "bg-blue-500"
                        : job.status === "rejected"
                        ? "bg-red-500"
                        : job.status === "hired"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleRes(job?.jobId, job?.skills)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-md"
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
