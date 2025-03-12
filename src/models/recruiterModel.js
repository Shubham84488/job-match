import mongoose from "mongoose"

const recruiterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    phone: { type: String, required: true  },
    company: { type: String, required: true },
    industry: { type: String }, 
    website: { type: String }, 
    location: { type: String }, 
    linkedin: { type: String },
    jobPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], 
}) 

const recruiter =mongoose.models.recruiter || mongoose.model("recruiter", recruiterSchema)
export default recruiter