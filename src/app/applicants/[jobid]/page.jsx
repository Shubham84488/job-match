"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Lora } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";

const lora = Lora({subsets:['latin'],weight:["600"]})

const Page = () => {
  const { jobid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [reports, setReports] = useState({});

  useEffect(() => {
    const storedReports = localStorage.getItem("rec-reports");
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);
  useEffect(() => {console.log(applicants)},[applicants])

  const handleStatusChange=async(status,applicantId,jobId)=>{
    try {
      const response = await axios.post("/api/recruiters/status",{status,applicantId,jobId})
      console.log(response.data)
      toast.success("Status updated succesfully")

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log("Some error occurred : ",error)
    }
  }

  const handleRes = async (applicantId) => {
    try {
      const response = await axios.post(`/api/recruiters/applicants/${jobid}`, {
        applicantId: applicantId,
      });

      setReports((prevReports) => {
        const updatedReports = {
          ...prevReports,
          [applicantId]: response.data,
        };
        localStorage.setItem("rec-reports", JSON.stringify(updatedReports)); // Save to local storage
        return updatedReports;
      });
    } catch (error) {
      console.log("Some error happened " + error);
    }
  };

  useEffect(() => {
    if (!jobid) return;

    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`/api/recruiters/applicants/${jobid}`);
        setApplicants(response.data || []);
      } catch (error) {
        console.log("Some error occurred: " + error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [jobid]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Toaster />
      <header className="bg-gray-100 shadow-lg p-6 rounded-lg">
        <h1 className={`text-center text-blue-700 text-4xl font-bold ${lora.className}`}>
          Applicants
        </h1>
      </header>

      {isLoading ? (
        <div className="text-center mt-6 text-lg font-semibold text-gray-700">
          Loading applicants...
        </div>
      ) : applicants?.length === 0 ? (
        <div className="text-center mt-6 text-lg font-semibold text-gray-600">
          No Applicants Yet
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-lg mt-6">
          <table className="w-full border-collapse bg-white rounded-lg shadow-md">
          <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="p-4 text-left">NAME</th>
                <th className="p-4 text-left">EMAIL</th>
                <th className="p-4 text-left">NUMBER</th>
                <th className="p-4 text-left">STATUS</th>
                <th className="p-4 text-left">RESUME</th>
                <th className="p-4 text-left">RESUME SCORE</th>
              </tr>
            </thead>
            <tbody>
              {applicants?.map((applicant, index) => (
                <tr
                  key={index}
                  className={`border-t transition-all ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
                >
                  <td className="p-4">{applicant.name}</td>
                  <td className="p-4">{applicant.email}</td>
                  <td className="p-4">{applicant.phone}</td>
                  <td className="p-4">
                    <select
                      className="border p-2 rounded bg-gray-100 focus:ring focus:ring-blue-200"
                      value={applicant.appliedJobs.find(applied => applied.jobId == jobid)?.status || "pending"}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        if (window.confirm(`Are you sure you want to change the status to "${newStatus}"?`)) {
                          handleStatusChange(newStatus, applicant._id, jobid);
                        }
                      }}
                    >
                      {["pending", "shortlisted", "rejected", "hired"].map((status) => (
                        <option key={status} value={status} className="text-gray-700">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <Link href={applicant?.career?.resume ?? " "} className="text-blue-600 hover:underline">
                      View Resume
                    </Link>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRes(applicant._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-md"
                    >
                      {reports[applicant._id] ? `Score: ${reports[applicant._id]}` : "Get Resume Score"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
