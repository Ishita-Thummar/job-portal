import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

//post new application or apply for work
export const postApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource", 400)
    );
  }
  const { name, email, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Worker",
  };
  if (!jobId) {
    return next(new ErrorHandler("workId not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("work details not found!", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (!name || !email || !phone || !address || !applicantID || !employerID) {
    return next(new ErrorHandler("Please fill all fields!", 400));
  }
  console.log("New Application Data:", {
    name,
    email,
    phone,
    address,
    applicantID,
    employerID,
  });

  const application = await Application.create({
    name,
    email,
    phone,
    address,
    applicantID,
    employerID,
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

//to see all applications of a workers
export const employerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Worker") {
      return next(
        new ErrorHandler("Worker is not allowed to access this resources!", 400)
      ); //worker can not post a job
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

//to see applications done by a particular worker
export const workerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Worker is not allowed to access this resources!", 400)
      ); //worker can not post a job
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const workerDeleteApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Worker is not allowed to access this resources!", 400)
      ); //worker can not post a job
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Oops, application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted Successfully!",
    });
  }
);
