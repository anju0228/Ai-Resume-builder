import express from "express";
import { enhancerProfessionalSummary, enhanceJobDescription, generateResumeContent } from "../configs/controllers/aiController.js";


const aiRouter = express.Router();

aiRouter.post("/enhancer-professional-summary", enhancerProfessionalSummary);
aiRouter.post("/enhance-job-description", enhanceJobDescription);
aiRouter.post("/generate-resume", generateResumeContent);

export default aiRouter;