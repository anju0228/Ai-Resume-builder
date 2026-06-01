import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRouter.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRouter.js";


const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
await connectDB();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Resume Builder API");
});
app.use("/api/users", userRouter);

app.use("/api/resumes", resumeRouter);
app.use('/api/ai', aiRouter);


app.use("/api/users", (req, res, next) => {
  console.log("✅ /api/users route hit:", req.method, req.url);
  next();
});
app.get("/api/users/data", (req, res) => {
  res.send("TEST WORKING");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});