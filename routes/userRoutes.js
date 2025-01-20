import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find({}, "-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

export default router;
