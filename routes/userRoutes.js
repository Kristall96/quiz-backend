import express from "express";
import User from "../models/User.js";
<<<<<<< HEAD

const router = express.Router();

=======
import jwt from "jsonwebtoken";

const router = express.Router();

// PROFILE Route
router.get("/profile", async (req, res) => {
  console.log("🔍 Cookies received:", req.cookies);
  const token = req.cookies.refreshToken;

  if (!token) {
    console.error("❌ No token provided");
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.error("❌ Token verification failed!", err);
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await User.findById(decoded.id).select(
      "-password -refreshToken"
    );
    if (!user) {
      console.error("❌ User not found!");
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  });
});

>>>>>>> 22e1fcc21fbc39b7ffa17983443bb7ed5a86df75
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
