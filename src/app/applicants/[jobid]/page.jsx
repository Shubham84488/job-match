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
    <div className="max-w-6xl mx-auto p-6">
  <Toaster />
  <header className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl p-6 rounded-lg">
    <h1 className={`text-center text-purple-600 text-5xl font-extrabold tracking-wide ${lora.className}`}>
      Applicants
    </h1>
  </header>

  {isLoading ? (
    <div className="text-center mt-8 text-lg font-semibold text-gray-700">
      Loading applicants...
    </div>
  ) : applicants?.length === 0 ? (
    <div className="text-center mt-8 text-lg font-semibold text-gray-600">
      No Applicants Yet
    </div>
  ) : (
    <div className="overflow-x-auto rounded-xl mt-8 shadow-2xl">
      <table className="w-full border-collapse bg-white rounded-xl">
        <thead className="bg-blue-200 text-purple-900 text-sm uppercase tracking-wider">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Number</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Resume</th>
            <th className="p-4 text-left">Resume Score</th>
          </tr>
        </thead>
        <tbody>
          {applicants?.map((applicant, index) => (
            <tr
              key={index}
              className={`transition-all duration-300 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50`}
            >
              <td className="p-4 font-medium text-gray-800">{applicant.name}</td>
              <td className="p-4 text-gray-700">{applicant.email}</td>
              <td className="p-4 text-gray-700">{applicant.phone}</td>
              <td className="p-4">
                <select
                  className="border border-gray-300 p-2 rounded-md bg-white shadow-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-300 transition"
                  value={
                    applicant.appliedJobs.find((applied) => applied.jobId == jobid)?.status || "pending"
                  }
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    if (
                      window.confirm(`Are you sure you want to change the status to "${newStatus}"?`)
                    ) {
                      handleStatusChange(newStatus, applicant._id, jobid);
                    }
                  }}
                >
                  {["pending", "shortlisted", "rejected", "hired"].map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-4">
                <Link
                  href={applicant?.career?.resume ?? "#"}
                  className="text-blue-600 font-medium hover:underline hover:text-blue-800"
                >
                  View Resume
                </Link>
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleRes(applicant._id)}
                  className={`${
                    reports[applicant._id]
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-4 py-2 rounded-full transition font-semibold shadow-sm`}
                >
                  {reports[applicant._id]
                    ? `Score: ${reports[applicant._id]}`
                    : "Get Resume Score"}
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
