"use client";

import { createContext, useState, useContext } from "react";

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

  // Function to update state
  const updateProfile = (field, subfield, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: typeof prevData[field] === "object"
        ? { ...prevData[field], [subfield]: value } // Handle nested updates
        : value,
    }));
  };
  

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom Hook for easy access
export const useProfile = () => useContext(ProfileContext);
