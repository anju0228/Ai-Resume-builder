import express from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  getUserResume,
} from "../configs/controllers/userController.js";

import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// ✅ Auth routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// ✅ Protected routes
userRouter.get("/data", protect, getUserById);
userRouter.get("/resumes", protect, getUserResume);

export default userRouter;