"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DM_Serif_Text } from "next/font/google";
import { LogOut, Briefcase, UserPen, User, Info, Menu } from "lucide-react";

const dm_Serif_Text = DM_Serif_Text({ subsets: ['latin'], weight: ["400"] });

const Sidebar = () => {
  const [role, setRole] = useState("jobseeker");
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/jobseekers/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.log("Some error happened");
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get("/api/jobseekers/role");
        setRole(response.data.role);
      } catch (error) {
        console.log("Error fetching role:", error);
        router.push("/login");
      }
    };

    fetchRole();
  }, []);

  return (
    <>
      <Toaster />

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-4 md:hidden fixed top-0 left-0 z-50"
      >
        <Menu size={28} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col p-5 z-40 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:flex`}
      >
        <Link href="/" className={dm_Serif_Text.className}>
          <h1 className="text-4xl md:text-left text-center  italic font-bold mb-6">JOBNEW</h1>
        </Link>

        {role === "jobseeker" ? (
          <ul className="space-y-4">
            <li>
              <Link href="/myApplication" className="hover:text-gray-400 flex gap-2 mt-2">
                <UserPen />
                <p>My Applications</p>
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="hover:text-gray-400 flex gap-2 mt-2">
                <Briefcase />
                <p>Jobs</p>
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-gray-400 flex gap-2 mt-2">
                <User />
                <p>Profile</p>
              </Link>
            </li>
            <li>
              <Link href="/aboutUs" className="hover:text-gray-400 flex gap-2 mt-2">
                <Info />
                <p>About Us</p>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="space-y-4">
            <li>
              <Link href="/rec-dashboard" className="hover:text-gray-400 flex gap-2 mt-2">
                <UserPen />
                <p>Dashboard</p>
              </Link>
            </li>
            <li>
              <Link href="/rec-postjob" className="hover:text-gray-400 flex gap-2 mt-2">
                <Briefcase />
                <p>Post Jobs</p>
              </Link>
            </li>
            <li>
              <Link href="/rec-profile" className="hover:text-gray-400 flex gap-2 mt-2">
                <User />
                <p>Profile</p>
              </Link>
            </li>
            <li>
              <Link href="/aboutUs" className="hover:text-gray-400 flex gap-2 mt-2">
                <Info />
                <p>About Us</p>
              </Link>
            </li>
          </ul>
        )}

        <div className="absolute bottom-5">
          <button onClick={handleLogout} className="hover:text-gray-400 mb-4 mx-2 flex gap-2">
            <LogOut opacity="0.6" />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
