import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// PROFILE Route
router.get("/profile", async (req, res) => {
  try {
    console.log("🔍 Checking profile...");

    const token = req.cookies.refreshToken;
    if (!token) {
      console.error("❌ No token found!");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify Token
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          console.error("❌ Token verification failed!", err);
          return res.status(403).json({ error: "Forbidden" });
        }

        // Find User in Database
        const user = await User.findById(decoded.id).select(
          "-password -refreshToken"
        );
        if (!user) {
          console.error("❌ User not found!");
          return res.status(404).json({ error: "User not found" });
        }

        console.log("✅ Profile fetched successfully:", user);
        res.json(user);
      }
    );
  } catch (err) {
    console.error("🔥 Internal Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find({}, "-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});
router.get("/rank", async (req, res) => {
  try {
    const user = await User.find().sort({ points: -1 }).limit(13);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/", async (req, res) => {
  try {
    const upadeUser = await User.findByIdAndUpdate().sort({ role });
    res.status(200).json(upadeUser);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { isAdmin } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isAdmin: isAdmin,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Internal server" });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ error: "Cannot find user to delete" });
    }

    res
      .status(200)
      .json({ message: `User deleted successfully`, user: deleteUser });
  } catch (err) {
    res.status(500).json(`Internal server error`);
  }
});
export default router;
