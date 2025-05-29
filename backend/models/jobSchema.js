import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title"],
    minLength: [4, "Job title must contain atleast 4 characters!"],
    maxLength: [20, "Job title can not exceed 50 characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide job description!"],
    minLength: [10, "Job description must contain atleast 10 characters!"],
    maxLength: [300, "Job description can not exceed 120 characters!"],
  },
  category: {
    type: String,
    required: [true, "Job category is required!"],
  },
  country: {
    type: String,
    required: [true, "Job Country is required!"],
  },
  city: {
    type: String,
    required: [true, "Job city is required!"],
  },
  location: {
    type: String,
    required: [true, "Please provide your exact location!"],
    minLength: [5, "Job location must contain atleast 30 characters!"],
  },
  fixedWages: {
    type: Number,
    minLength: [4, "Fixed wages must contain at least 4 digits per month!"],
    mixLength: [5, "Fixed wages can not exceed 5 digits per month"],
  },
  wagesFrom: {
    type: Number,
    minLength: [3, "Wages from must contain atleast 3 digits!"],
    maxLength: [4, "Wages from can not exceed 4 digits!"],
  },
  wagesTo: {
    type: Number,
    minLength: [3, "WagesTo must contain atleast 3 digits!"],
    maxLength: [4, "WagesTo can not exceed 4 digits!"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
