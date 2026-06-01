import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createResume, updateResume, getPublicResumeById, deleteResume, getResumeById } from "../configs/controllers/resumeController.js";
import upload from "../configs/muilter.js";

const resumeRouter = express.Router();

resumeRouter.post("/create", protect, createResume);
resumeRouter.put("/update", upload.single("file"), protect, updateResume);
resumeRouter.get("/get/:resumeId",protect, getPublicResumeById);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get("/public/:resumeId", protect, getResumeById);

export default resumeRouter;