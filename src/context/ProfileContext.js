"use client";

import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

// Create Context
const ProfileContext = createContext();

// Provider Component
export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    personal: {
      fullname: "",
      email: "",
      phone: "",
      state: "",
      city: "",
      whatsapp: "",
    },
    education: {
      college: "",
      gradYear: "",
      degree: "",
      department: "",
      jobStatus: "student", // Default
    },
    career: {
      linkedin: "",
      github: "",
      expectedCTC: "",
      currentCTC: "",
      joiningTime:"",
      experience:"",
      resume:""
    },
  });

  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/users/profile");
        console.log(response.data) // Update Context with API Data
        const data = response.data;
        
        setProfileData({
          personal: {
            fullname: data.personal.name || "",
            email: data.personal.email || "",
            phone: data.personal.phone || "",
            state: data.personal.state || "",
            city: data.personal.city || "",
            whatsapp: data.personal.whatsapp || "",
          },
          education: {
            college: data.education.college || "",
            gradYear: data.education.gradYear || "",
            degree: data.education.degree || "",
            department: data.education.department || "",
            jobStatus: data.education.jobStatus || "student",
          },
          career: {
            linkedin: data.career.linkedin || "",
            github: data.career.github || "",
            expectedCTC: data.career.expectedCTC || "",
            currentCTC: data.career.currentCTC || "",
            joiningTime: data.career.joiningTime || "",
            experience: data.career.experience || "",
            resume: data.career.resume || "",
          },
        })

      } catch (error) {
        console.error("Failed to fetch profile details");
      }
    };

    fetchProfile(); // Fetch user profile on component mount
  },[])

  // Function to update state
  const updateProfile = (field, subfield, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: typeof prevData[field] === "object"
        ? { ...prevData[field], [subfield]: value } // Handle nested updates
        : value,
    }));
  };
  

  const handleedit = async () => {
    try {
      const response = await axios.post("/api/users/profile", profileData);
      console.log("Profile updated successfully", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile, handleedit }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Custom Hook for easy access
export const useProfile = () => useContext(ProfileContext);
