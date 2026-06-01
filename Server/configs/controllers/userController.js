import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resumes from "../../models/Resume.js";

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;     
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    // return success message
const token = generateToken(newUser._id);
newUser.token = undefined; // Exclude token from the response
return res.status(201).json({
  message: "User registered successfully",token,
  user: { newUser }});
}catch (error) {
    return res.status(400).json({ message: "Server error", error: error.message });
    }
};

// controller for user login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check if password matches
    if (!user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    

    const token = generateToken(user._id);
    user.password = undefined; // Exclude password from the response

    return res.status(200).json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// controller for getting user by id
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is set in the auth middleware
    const user = await User.findById(userId);
if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // return user 
    user.password = undefined; // Exclude password from the response
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }

};

// controller for getting user resume
export const getUserResume = async (req, res) => {  
  try {
    const userId = req.userId; // Assuming userId is set in the auth middleware
    const resumes = await Resumes.find({ userId });
    
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

