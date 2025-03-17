import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  minSalary: { type: Number, required: true },
  maxSalary: { type: Number, required: true },
  applyByDate: { type: Date, required: true },
  responsibilities: { type: [String], required: true },
  skills: { type: [String], required: true },
  companyDescription: { type: String, required: true },
  openings: { type: Number, required: true, min: 1 },
  
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "recruiter", required: true }, // Linked to recruiter
  
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobseeker" }], // Jobseekers who applied

}, { timestamps: true });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
