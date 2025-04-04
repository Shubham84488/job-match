"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Lora } from "next/font/google";
import { useRouter } from "next/navigation";

const lora = Lora({ subsets: ["latin"], weight: ["600"] });

const Page = () => {
  const [jobPosted, setJobPosted] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const showApplicants = (jobid) => {
    router.push(`/applicants/${jobid}`);
  };

  useEffect(() => {
    const fetchJobPosted = async () => {
      try {
        const response = await axios.get("/api/recruiters/dashboard");
        setJobPosted(response.data || []);
      } catch (error) {
        console.log("Some error occurred: " + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobPosted();
  }, []);

  return (
    <div className="min-h-screen">
      <header className={`text-center text-4xl m-6 text-blue-700 ${lora.className}`}>
        <h1>Jobs Posted by You</h1>
      </header>

      {isLoading ? (
        <div className="flex justify-center mt-6">
          <p className="text-lg font-semibold text-gray-500 animate-pulse">Loading jobs...</p>
        </div>
      ) : jobPosted.length > 0 ? (
        <div className="flex justify-center">
          <div className="w-4/5 md:w-3/5">
            {jobPosted.map((job, index) => (
              <div key={index} className="bg-white shadow-lg border border-gray-300 rounded-xl p-6 mb-6 transition-transform hover:scale-[1.02]">
                <h2 className="text-2xl font-bold text-gray-800">{job?.title}</h2>
                <p className="text-gray-600 text-lg">{job?.company}</p>

                <div className="flex gap-4 mt-3 text-gray-700">
                  <div className="flex items-center gap-1">
                    <Image src="/icons8-location-50.png" width={20} height={20} alt="location" />
                    <p>{job?.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image src="/icons8-experience-50.png" width={20} height={20} alt="exp" />
                    <p>{job?.experience} yrs</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image src="/icons8-money-32.png" width={20} height={20} alt="salary" />
                    <p>{job?.minSalary?.toLocaleString("en-IN")} - {job?.maxSalary?.toLocaleString("en-IN")}</p>
                  </div>
                </div>

                <div className="flex justify-between mt-5 items-center">
                  <div className="flex gap-2 flex-wrap">
                    {job?.skills?.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-blue-200 text-blue-800 px-3 py-1 text-sm rounded-lg font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button 
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    onClick={() => showApplicants(job?._id)}
                  >
                    View Applicants
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-xl mt-2 text-gray-500">No Jobs found 😢</p>
        </div>
      )}
    </div>
  );
};

export default Page;
