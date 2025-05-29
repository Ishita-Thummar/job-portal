import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
    minLength: [3, "Name must contain atleast 3 characters!"],
    maxLength: [20, "Name can not exceed 20 characters!"],
  },
  email: {
    type: String,
    validator: [validator.isEmail, "Please provide a valid email!"],
    required: [true, "Please provide your email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "Please provide your address!"],
  },

  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Worker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
