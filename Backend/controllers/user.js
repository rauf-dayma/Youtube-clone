import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret_key";

export async function signUp(req, res) {
  try {
    const { channelName, userName, about, profilePic, password } = req.body;

    // Check if the user already exists
    const isExist = await User.findOne({ userName });
    if (isExist) {
      return res.status(400).json({ message: "User already exists. Please try again with a different username." });
    }

    // Hash the password
    const updatedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({ channelName, userName, about, profilePic, password: updatedPassword });
    await user.save();

    // Send success response
    return res.status(201).json({ message: "User registration successful", success: "yes", data: user });
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function signIn(req, res) {
    try{
        const {password, userName} = req.body;
        const user = await User.findOne({userName});
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        
        if(user && await bcrypt.compare(password, user.password)){
            res.json({message: "logged  in successfully", token})
        }else{
            res.status(500).json({error : "server error"})
        }

    }catch(err){
        console.error("Error during signin:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

export async function getUserInfo(req, res) {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "success", user });
  } catch (err) {
    console.error("Error fetching user info:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Verify token
      req.user = { userId: decoded.id }; // Attach userId to the request object
  
      // Optionally, you can find the user from the database if you need user details
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      next();
    } catch (err) {
      return res.status(400).json({ message: "Invalid token." });
    }
  };
  