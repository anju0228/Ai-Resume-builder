import Resumes from "../../models/Resume.js";
import imageKit from "../imagekit.js";
import fs from "fs";

// controller for creating resume

export const createResume = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is set in the auth middleware
        const { title } = req.body; // Get resume data from request body
        // Check if a resume already exists for the user
        const newResume = await Resumes.create({ userId, title }); 
        return res.status(201).json({ message: "Resume created successfully", resume: newResume });
    } catch (error) {
        return res.status(400).json({ message: "Server error", error: error.message });
    }   
};

// controller for getting user resume
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const resumeId = req.params.id; // Get resume ID from request parameters
        const resume = await Resumes.findOneAndDelete({ _id: resumeId, userId });

        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// get user resume
export const getResumeById = async (req, res) => {
   try {
     const userId = req.userId;
     const { resumeId } = req.params;
      // Get resume ID from request parameters
     const resumes = await Resumes.findOne({ userId, _id: resumeId });
        if (!resumes) {
        return res.status(404).json({ message: "Resume not found" });
    }

    resumes.__v = undefined; // Exclude __v from the response
    resumes.createdAt = undefined; // Exclude createdAt from the response
    resumes.updatedAt = undefined; // Exclude updatedAt from the response


     return res.status(200).json({ resumes });
   } catch (error) {
     return res.status(500).json({ message: "Server error", error: error.message });
   }
};

// get resume by id public
export const getPublicResumeById = async (req, res) => {
    try {
      const { resumeId } = req.params; // Get resume ID from request parameters
      const resumes = await Resumes.findOne({ _id: resumeId, public: true });
      if (!resumes) {
        return res.status(404).json({ message: "Resume not found" });
    }
    return res.status(200).json({ resumes });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// update resume
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumedata, removeBackground } = req.body; // Get resume ID from request parameters
        const image = req.file;

        let resumeDataCopy;
        if(typeof resumeData === 'string'){
            resumeDataCopy = await JSON.parse(resumeData)
        }else{
            resumeDataCopy = structuredClone(resumeData)
        }
        if (image) {
            if (!imageKit) {
                return res.status(400).json({ message: "Image upload service not configured - IMAGEKIT_PRIVATE_KEY is missing" });
            }
            const imageBuffer = fs.createReadStream(image.path);
            const response = await imageKit.upload({
                file: imageBuffer,
                fileName: "resume-image.jpg",
                folder: "user-resumes",
                transformation: {
                    pre: "w-300,h-300,fo-auto,pr-true" + (removeBackground ? ",e-background_removal" : "")
                }
            });
            resumeData.personal_info.image = response.url;
        }

        const resume = await Resumes.findOneAndUpdate({ _id: resumeId, userId }, resumeData, { new: true });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }   
        return res.status(200).json({ message: "Resume updated successfully", resume });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }


};
