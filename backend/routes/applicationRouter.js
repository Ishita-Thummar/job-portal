import express from "express";
import {
  employerGetAllApplications,
  workerDeleteApplication,
  workerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/worker/getall", isAuthorized, workerGetAllApplications);
router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.delete("/delete/:id", isAuthorized, workerDeleteApplication);
router.post("/post", isAuthorized, postApplication);
export default router;
