import Resume from "../../models/Resume.js";
import ai from "../ai.js";




// controller for ai related operations
export const enhancerProfessionalSummary = async (req, res) => {
    try {
        const { summary } = req.body;
        if (!summary) {
            return res.status(400).json({ message: "Summary is required" });
        }

      const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Enhance the following professional summary: ${summary}` }
            ]
        });
        const enhancedSummary = response.choices?.[0]?.message?.content?.trim();
        return res.status(200).json({ message: "Summary enhanced successfully", enhancedSummary });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// controller for enhancinng resume content
export const enhanceJobDescription = async (req, res) => {
    try {
        const { jobDescription } = req.body;
        if (!jobDescription) {
            return res.status(400).json({ message: "Job description is required" });
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Enhance the following job description: ${jobDescription}` }
            ]
        });
        const enhancedDescription = response.choices?.[0]?.message?.content?.trim();
        return res.status(200).json({ message: "Job description enhanced successfully", enhancedDescription });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }   
};

// controller for uploading reume
export const generateResumeContent = async (req, res) => {
    try {
        const { resumeData,title } = req.body;
        const userId = req.userId;
        if (!resumeData ) {
            return res.status(400).json({ message: "Resume data and title are required" });
        }
        const systemPrompt = "You are a helpful assistant that generates resume content based on provided data.";
        const userPrompt = `Create a valid JSON object for a resume using the following title and data. Title: ${title}. Data: ${resumeData}`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `${userPrompt}\nRespond only with valid JSON and no additional text.` }
            ]
        });

        const extractedResume = response.choices?.[0]?.message?.content?.trim();
        if (!extractedResume) {
            return res.status(500).json({ message: "OpenAI returned an empty response" });
        }

        let parsedResume;
        try {
            parsedResume = JSON.parse(extractedResume);
        } catch (parseError) {
            return res.status(500).json({ message: "Failed to parse OpenAI response as JSON", error: parseError.message, response: extractedResume });
        }

        const newResume = await Resume.create({ userId, title, content: parsedResume });
        return res.status(200).json({ message: "Resume generated successfully", resume: newResume });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

