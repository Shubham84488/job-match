"use client"
import CategoriesSection from "@/components/CategoriesSection";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [role,setRole]=useState("")
  const router = useRouter();

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
    <div>
      <Hero role={role}/>
      <CategoriesSection/>
      <WhyChooseUs />
    </div>
  );
}
