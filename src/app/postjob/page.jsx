"use client"
import { Nunito} from 'next/font/google'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
import { Trash2,Plus } from 'lucide-react'
import axios from 'axios'


const nunito = Nunito({subsets:["latin"],weight:["400"]})

const PostJob = () => {
  const [title,setTitle] = useState("");
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [minSalary, setMinSalary] = useState("")
  const [maxSalary, setMaxSalary] = useState("")
  const [applyByDate, setApplyByDate] = useState("")
  const [responsibilities, setResponsibilities] = useState([""])
  const [skills, setSkills] = useState([""])
  const [companyDescription, setCompanyDescription] = useState("")
  const [openings, setOpenings] = useState("1")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addResponsibility = () => setResponsibilities([...responsibilities, ""])
  const updateResponsibility = (index, value) => {
    const updated = [...responsibilities]
    updated[index] = value
    setResponsibilities(updated)
  }
  const removeResponsibility = (index) => {
    if (responsibilities.length > 1) {
      const updated = [...responsibilities]
      updated.splice(index, 1)
      setResponsibilities(updated)
    }
  }

  const addSkill = () => setSkills([...skills, ""])
  const updateSkill = (index, value) => {
    const updated = [...skills]
    updated[index] = value
    setSkills(updated)
  }
  const removeSkill = (index) => {
    if (skills.length > 1) {
      const updated = [...skills]
      updated.splice(index, 1)
      setSkills(updated)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const jobData = {
      title,
      company,
      location,
      minSalary,
      maxSalary,
      applyByDate,  // Ensure consistent key name
      responsibilities,
      skills,
      companyDescription,
      openings: Number.parseInt(openings),
    };

    console.log(jobData); // Now it will log correct data

    try {
      const response = await axios.post("/api/recruiters/postjob", jobData);
      console.log(response)
      alert("Job posted successfully!")
    } catch (error) {
      alert("Failed to post job. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl ">
      <h1 className="text-3xl font-bold text-center">POST A JOB</h1>
      <p className="text-center mb-6">Fill in the details below to post a new job opening</p>
      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-100 p-6 shadow-md rounded-lg">
        <div>
          <label className={`${nunito.className} text-lg mx-1`}>Job Title</label>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        
        <div>
          <label className={`${nunito.className} text-lg mx-1`}>Company</label>
          <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        
        <div>
          <label className={`${nunito.className} text-lg mx-1`}>Location</label>
          <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        
        <div>
          <label className={`${nunito.className} text-lg mx-1`}>Minimum Salary</label>
          <input type="number" placeholder="Minimum Salary" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        
        <div>
          <label className={`${nunito.className} text-lg mx-1`}>Maximum Salary</label>
          <input type="number" placeholder="Maximum Salary" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        
        <div>
          <label className={`${nunito.className} text-lg mx-1`}>Apply By Date</label>
          <input type="date" value={applyByDate} onChange={(e) => setApplyByDate(e.target.value)} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className={`${nunito.className} text-lg mx-1`}>Number of Openings</label>
          <input type="number" min="1" placeholder="Number of Openings" value={openings} onChange={(e) => setOpenings(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        
        <div>
          <label className={`${nunito.className} text-lg mx-1`}>Key Responsibilities</label>
          {responsibilities.map((r, index) => (
            <div key={index} className="flex gap-4 my-2">
              <input value={r} onChange={(e) => updateResponsibility(index, e.target.value)} required className="w-full p-2 border rounded" />
              <button type="button" onClick={() => removeResponsibility(index)} disabled={responsibilities.length === 1}>
                <Trash2 className='hover:cursor-pointer'/>
              </button>
            </div>
          ))}
          <button type="button" onClick={addResponsibility} className='border-2 border-black flex p-2 rounded-md gap-2 m-2'>
            <Plus/>
            <p>Add responsibility</p>
          </button>
        </div>

        <div>
          <label className={`${nunito.className} text-lg mx-1`}>Skills Required</label>
          {skills.map((s, index) => (
            <div key={index} className="flex gap-2 my-2">
              <input value={s} onChange={(e) => updateSkill(index, e.target.value)} required className="w-full px-2 py-1 border rounded" />
              <button type="button" onClick={() => removeSkill(index)} disabled={skills.length === 1}>
                <Trash2 className='hover:cursor-pointer'/>
              </button>
            </div>
          ))}
          <button type="button" onClick={addSkill} className='border-2 border-black flex px-2 py-1 rounded-md gap-2 m-2'>
            <Plus/>
            <p>Add skill</p>
          </button>
        </div>

        <div>
          <label className={`${nunito.className} text-lg mx-1`}>Company Description</label>
          <textarea placeholder="Company Description" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} rows="5" required className="w-full p-2 border rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  )
}

export default PostJob
