import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const router = express.Router();
router.use(cookieParser());

// Function to generate tokens
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // Short-lived token for security
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Longer-lived token
  );
};

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("🔥 Register Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Login in auth.js
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save the refresh token in the database (if you're tracking it)
    user.refreshToken = refreshToken;
    await user.save();

    // Set the refresh token in an HTTP-Only cookie
    res.cookie("refreshToken", refreshToken, {
      domain: "quiz-backend-rdcd.onrender.com", // explicitly set domain
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Set the access token in an HTTP-Only cookie
    res.cookie("accessToken", accessToken, {
      domain: "quiz-backend-rdcd.onrender.com", // explicitly set domain
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Optionally, also send the access token in the response body
    res.json({
      message: "Login successful",
      user: { username: user.username, email: user.email },
      accessToken, // This can be used by your client for immediate use
    });
  } catch (err) {
    console.error("🔥 Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Token Refresh
router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded.id, refreshToken });

    if (!user) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("🔥 Refresh Token Error:", err);
    res.sendStatus(403);
  }
});

// User Logout
router.post("/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("🔥 Logout Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
