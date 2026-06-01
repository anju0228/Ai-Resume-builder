import OpenAI from "openai";

let ai = null;
if (process.env.OPENAI_API_KEY) {
    ai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL,
    });
} else {
    console.warn('⚠️  OPENAI_API_KEY not set - AI resume enhancement features will not work');
}

export default ai;