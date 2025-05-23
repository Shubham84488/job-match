"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster,toast } from "react-hot-toast";

const HireTalent = () => {
  const [recruiter, setRecruiter] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const router = useRouter()

  const handleChange = (e) => {
    setRecruiter({ ...recruiter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.post("/api/recruiters/hiretalent", recruiter);
      console.log(response.data);
      toast.success("Signup Successful")
      router.push("/login")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <Toaster/>
      <div className="w-full max-w-md md:max-w-lg lg:max-w-md bg-gray-200 border-2 p-8 rounded-2xl shadow-lg shadow-black">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Recruiter Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Official Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your official email"
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              id="phone"
              name="phone"
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 text-lg font-semibold border-2 border-purple-700 rounded-lg bg-purple-500 text-white transition-all duration-300 hover:bg-purple-600 hover:shadow-md"
          >
            Submit
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 font-semibold hover:underline">
            Login
          </Link>
        </p>

        <p className="mt-4 text-center text-gray-700">
          Are you a jobseeker?{" "}
          <Link href="/signup" className="text-purple-600 font-semibold hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HireTalent;
