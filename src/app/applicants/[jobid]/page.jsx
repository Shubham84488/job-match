"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Lora } from "next/font/google";

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
        setApplicants(response.data);
      } catch (error) {
        console.log("Some error occurred: " + error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [jobid]);

  return (
    <div>
      <header>
        <h1 className={`text-center text-blue-600 pt-4 text-4xl font-bold ${lora.className}`}>Applicants</h1>
      </header>

      {isLoading ? (
        <div className="text-center mt-4 text-lg font-semibold">
          Loading applicants...
        </div>
      ) : (
        <div className="flex justify-center p-6 mt-6">
          <table className="text-center p-6 w-11/12 border border-gray-400 rounded-xl">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2">NAME</th>
                <th className="px-4 py-2">EMAIL</th>
                <th className="px-4 py-2">NUMBER</th>
                <th className="px-4 py-2">RESUME</th>
                <th className="px-4 py-2">RESUME SCORE</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="px-6 py-3">{applicant.name}</td>
                  <td className="px-6 py-3">{applicant.email}</td>
                  <td className="px-6 py-3">{applicant.phone}</td>
                  <td className="px-6 py-3">
                    <Link
                      href={applicant.career.resume}
                      className="text-blue-800 hover:opacity-80"
                    >
                      View Resume
                    </Link>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleRes(applicant._id)}
                      className="bg-blue-600 px-2 py-1 rounded-md text-white hover:opacity-90"
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
