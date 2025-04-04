"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Montserrat } from "next/font/google";
import toast from "react-hot-toast";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600"] });

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    website: "",
    location: "",
    linkedin: "",
    description: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/recruiters/profile");
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleedit = async()=>{
    try {
      const response = await axios.post("/api/recruiters/profile",profileData)
      console.log(response.data); 
      toast.success("Updated Succesfully")
    } catch (error) {
      toast.error("Updation failed")
    }
  } 

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <div className=" w-full mt-7 px-7">
        <div className="flex justify-between pb-3 border-b-2">
          <div>
            <h3 className={`text-blue-700 text-4xl font-bold ${montserrat.className}`}>Profile</h3>
            <p className="font-extralight text-2xl">Update your Profile details.</p>
          </div>

          <div className='flex justify-end mt-4 mr-20'>
            <button
                onClick={handleedit }
                className='rounded-md bg-blue-500 text-white px-7 py-4 hover:bg-blue-700 hover:scale-105 text-xl flex justify-center gap-2'>
                <Pencil height={20} className='mt-1'/>
                <p>SAVE</p>
            </button>
           </div>
        </div>

        <div className="border-2 shadow-md w-3/5 my-5 p-4 mr-16 rounded-lg">
          {/* Name */}
          <div>
            <label htmlFor="fullname" className="mt-3 text-blue-900">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              value={profileData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-gray-200 block w-full my-3 rounded-lg p-2"
            />
          </div>

          {/* Email & Phone */}
          <div className="flex">
            <div className="flex-row w-full mr-2">
              <label htmlFor="email" className="mt-3 text-blue-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={profileData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-gray-200 block w-full my-3 rounded-lg p-2"
              />
            </div>

            <div className="flex-row w-full ml-2">
              <label htmlFor="phone" className="mt-3 text-blue-900">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-gray-200 block w-full my-3 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Company & Industry */}
          <div className="flex">
            <div className="flex-row w-full mr-2">
              <label htmlFor="company" className="mt-3 text-blue-900">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={profileData.company ?? ""}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="bg-gray-200 block w-full my-3 rounded-lg p-2"
              />
            </div>

            <div className="flex-row w-full ml-2">
              <label htmlFor="industry" className="mt-3 text-blue-900">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                value={profileData.industry ?? "" }
                onChange={(e) => handleInputChange("industry", e.target.value)}
                className="bg-gray-200 block w-full my-3 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Website & LinkedIn */}
          <div className="flex">
            <div className="flex-row w-full mr-2">
              <label htmlFor="website" className="mt-3 text-blue-900">
                Website
              </label>
              <input
                type="text"
                id="website"
                value={profileData.website ?? ""}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="bg-gray-200 block w-full my-3 rounded-lg p-2"
              />
            </div>

            <div className="flex-row w-full ml-2">
              <label htmlFor="linkedin" className="mt-3 text-blue-900">
                LinkedIn Profile
              </label>
              <input
                type="text"
                id="linkedin"
                value={profileData.linkedin ?? ""}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                className="bg-gray-200 block w-full my-3 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="mt-3 text-blue-900">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={profileData.location ?? ""}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="bg-gray-200 block w-full my-3 rounded-lg p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="mt-3 text-blue-900">
              Company Description
            </label>
            <textarea
              id="description"
              value={profileData.description ?? ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="bg-gray-200 block w-full my-3 rounded-lg p-2"
              rows="3"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
