import mongoose from "mongoose";

const jobseekerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  phone: { type: String },
  state: { type: String },
  city: { type: String },
  whatsapp: { type: String },

  // Education Details
  education: {
    college: String,
    gradYear: String,
    degree: String,
    department: String,
    jobStatus: { type: String, default: "student" },
  },

  // Career Details
  career: {
    linkedin: String,
    github: String,
    expectedCTC: String,
    currentCTC: String,
    joiningTime: String,
    experience: String,
    resume: String, // Store resume file URL if uploaded
  },

  // Jobs the jobseeker has applied for
  appliedJobs: [
    {
      jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }, // Refers to Job model
      company: String,
      status: { type: String, enum: ["pending", "shortlisted", "rejected", "hired"], default: "pending" },
      appliedAt: { type: Date, default: Date.now },
    },
  ],
});

const jobseeker = mongoose.models.jobseeker || mongoose.model("jobseeker", jobseekerSchema);
export default jobseeker;
