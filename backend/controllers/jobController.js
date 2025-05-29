import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";


//function to fetch all jobs
export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  //or
  //const role = req.user.role;
  if (role === "Worker") {
    return next(
      new ErrorHandler("Worker is not allowed to access this resources!", 400)
    ); //worker can not post a job
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedWages,
    wagesFrom,
    wagesTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full work details!", 400));
  }
  if ((!wagesFrom || !wagesTo) && !fixedWages) {
    return next(
      new ErrorHandler("Please either provide fixed wages or ranged wages!")
    );
  }

  if (!wagesFrom && !wagesTo && !fixedWages) {
    return next(
      new ErrorHandler("Please either provide fixed wages or ranged wages!")
    );
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedWages,
    wagesFrom,
    wagesTo,
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "Work posted successfully!",
    job,
  });
});

export const getMyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Worker") {
    return next(
      new ErrorHandler("Worker is not allowed to access this resource!", 400)
    );
  }

  const myJobs = await Job.find({ postedBy: req.user._id });

  res.status(200).json({
    success: true,
    myjobs: myJobs || [], // Always return an array
  });
});

//update a job
export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Worker") {
    return next(
      new ErrorHandler("Worker is not allowed to access this resources!", 400)
    ); //worker can not post a job
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops, Job not found!", 404)); //worker can not post a job
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Work Updated Successfully!",
  });
});

//delete a job
export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Worker") {
    return next(
      new ErrorHandler("Worker is not allowed to access this resources!", 400)
    ); //worker can not post a job
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops, Job not found!", 404)); //worker can not post a job
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Work Deleted Successfully!",
  });
});

export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Work not found!", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler("Invalid ID !", 400));
  }
});
