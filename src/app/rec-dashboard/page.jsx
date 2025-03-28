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

  const showApplicants=(jobid)=>{
    router.push(`/applicants/${jobid}`)
  }

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
    <div>
      <header className={`text-center text-4xl m-4 ${lora.className}`}>
        <h1>Jobs Posted by You</h1>
      </header>

      {isLoading ? (
        <div className="flex justify-center mt-6">
          <p className="text-lg font-semibold text-gray-500">Please wait...</p>
        </div>
      ) : jobPosted.length > 0 ? (
        <div className="flex justify-center">
          <div className="w-3/5">
            {jobPosted.map((job, index) => (
              <div key={index} className="border-2 m-5 rounded-xl p-4">
                <p className="text-lg font-bold">{job?.title}</p>
                <p className="font-light text-base">{job?.company}</p>
                <div className="flex gap-3 mt-2">
                  <div className="flex gap-1">
                    <Image src="/icons8-location-50.png" width={24} height={14} alt="location" />
                    <p>{job?.location}</p>
                  </div>
                  <div className="flex gap-1">
                    <Image src="/icons8-experience-50.png" width={24} height={14} alt="exp" />
                    <p>{job?.experience} years</p>
                  </div>
                  <div className="flex gap-1">
                    <Image src="/icons8-money-32.png" width={24} height={14} alt="sal" />
                    <p>
                      {job?.minSalary?.toLocaleString("en-IN")} - {job?.maxSalary?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex gap-3">
                    {job?.skills?.slice(0, 3).map((skill, index) => (
                      <p className="skills" key={index}>
                        {skill}
                      </p>
                    ))}
                  </div>
                  <div>
                    <button className="font-bold p-2 px-4 text-white bg-blue-500 rounded-xl hover:bg-blue-700 flex gap-2"
                      onClick={()=>showApplicants(job?._id)}>
                      Show Applicants
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-xl mt-2">No Jobs found 😢</p>
        </div>
      )}
    </div>
  );
};

export default Page;
