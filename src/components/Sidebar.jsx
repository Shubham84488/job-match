"use client"
import Link from "next/link";
import { useState,useEffect } from "react";
import { Toaster,toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DM_Serif_Text } from "next/font/google";
import { LogOut,Briefcase, UserPen, User, Info, Pencil } from "lucide-react";

const dm_Serif_Text = DM_Serif_Text({subsets: ['latin'],weight: ["400"]});

const Sidebar = () => {
  const [role,setRole] = useState("jobseeker")
  const router = useRouter()

  const handleLogout=async()=>{
    try {
      const response =await axios.get("/api/jobseekers/logout")
      console.log(response.data.message)
      toast.success("Logged out successfully")
      router.push("/login")
    } catch (error) {
      console.log("Some error happened")
    }
  }

  useEffect(()=>{
    const fetchRole = async () => {
      try {
        const response = await axios.get("/api/jobseekers/role"); 
        setRole(response.data.role);
      } catch (error) {
        console.log("Error fetching role:", error);
        router.push("/login")
      }
    };
  
    fetchRole();
  },[])
  
    return (
      <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 flex flex-col p-5">
        <Toaster/>
        <Link href="/" className={dm_Serif_Text.className}>
          <h1 className="text-4xl italic font-bold mb-6">JOBNEW</h1>
        </Link>
        {role=="jobseeker" ?(
          <ul className="space-y-4">
            <li>
              <a href="/myApplication" className="hover:text-gray-400 flex gap-2  mt-2">
                <UserPen/> 
                <p>My Applications</p>  
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-gray-400 flex gap-2 mt-2">
                <Briefcase/>
                <p>Jobs</p>
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-gray-400 flex gap-2 mt-2">
                <User/>
                <p>Profile</p>
              </a>
            </li>
            <li>
              <a href="/aboutUs" className="hover:text-gray-400 flex gap-2 mt-2">
                <Info/>
                <p>About Us</p>
              </a>
            </li>
          </ul>
        ) : 
        (
          <ul className="space-y-4">
            <li>
              <a href="/rec-dashboard" className="hover:text-gray-400 flex gap-2 mt-2">
                <UserPen/>
                <p>Dashboard</p>
              </a>
            </li>
            <li>
              <a href="/rec-postjob" className="hover:text-gray-400 flex gap-2 mt-2">
                <Briefcase/>
                <p>Post Jobs</p>
              </a>
            </li>
            <li>
              <a href="/rec-profile" className="hover:text-gray-400 flex gap-2 mt-2">
                <User/>
                <p>Profile</p>
              </a>
            </li>
            <li>
              <a href="/aboutUs" className="hover:text-gray-400 flex gap-2 mt-2">
                <Info/>
                <p>About Us</p>
              </a>
            </li>
          </ul>
        )
        }
        
        <ul className="absolute bottom-5">
          <button onClick={handleLogout} className="hover:text-gray-400 mb-4 mx-2 flex gap-2">
            <LogOut opacity="0.6"/>
            <p>Logout</p>
          </button>
        </ul>
      </div>
    );
  };

export default Sidebar;