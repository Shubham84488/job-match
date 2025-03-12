"use client"
import Link from "next/link";
import { useState,useEffect } from "react";
import axios from "axios";
const Sidebar = () => {
  const [role,setRole] = useState("jobseeker")

  useEffect(()=>{
    const fetchRole = async () => {
      try {
        const response = await axios.get("/api/jobseekers/role");
        console.log(response);
        setRole(response.data.role);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };
  
    fetchRole();
  },[])
    return (
      <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 flex flex-col p-5">
        <Link href="/">
          <h1 className="text-2xl font-bold mb-6">JOBNEW</h1>
        </Link>
        {role=="jobseeker" ?(
          <ul className="space-y-4">
            <li><a href="/dashboard" className="hover:text-gray-400">Dashboard</a></li>
            <li><a href="/jobs" className="hover:text-gray-400">Jobs</a></li>
            <li><a href="/profile" className="hover:text-gray-400">Profile</a></li>
            <li><a href="/aboutUs" className="hover:text-gray-400">About Us</a></li>
          </ul>
        ) : 
        (
          <ul className="space-y-4">
            <li><a href="/rec-dashboard" className="hover:text-gray-400">Dashboard</a></li>
            <li><a href="/rec-postjobs" className="hover:text-gray-400">Jobs</a></li>
            <li><a href="/rec-profile" className="hover:text-gray-400">Profile</a></li>
            <li><a href="/aboutUs" className="hover:text-gray-400">About Us</a></li>
          </ul>
        )
        }
        
        <ul className="absolute bottom-5">
            <li><a href="/aboutUs" className="hover:text-gray-400"> Logout</a></li>
        </ul>
      </div>
    );
  };

export default Sidebar;