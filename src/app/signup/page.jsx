"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster,toast } from "react-hot-toast";
import Link from "next/link";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/jobseekers/signup", user);
      console.log(response.data);
      toast.success("Signup Successfull");
      router.push("/login")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <Toaster/>
      <div className="w-full max-w-md md:max-w-lg lg:max-w-md bg-gray-200 border-2 p-8 rounded-2xl shadow-lg shadow-black">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">JobSeeker Sign Up</h1>

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
          Are you a recruiter?{" "}
          <Link href="/hiretalent" className="text-purple-600 font-semibold hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
