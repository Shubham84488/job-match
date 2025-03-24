"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster,toast } from "react-hot-toast";
import Link from "next/link";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "jobseeker", 
  });
  const router = useRouter();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/jobseekers/login", user);
      toast.success("Login Successful")
      console.log(response.data);
      router.push("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <Toaster/>
      <div className="w-full max-w-md md:max-w-lg lg:max-w-md bg-gray-200 border-2 p-8 rounded-2xl shadow-lg shadow-black">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
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

          {/* Role Selection Dropdown */}
          <div>
            <label htmlFor="role" className="text-lg font-medium text-gray-700">Login As</label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 text-lg font-semibold border-2 border-purple-700 rounded-lg bg-purple-500 text-white transition-all duration-300 hover:bg-purple-600 hover:shadow-md"
          >
            Submit
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Don't have an account?{" "}
          <Link href="/signup" className="text-purple-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
