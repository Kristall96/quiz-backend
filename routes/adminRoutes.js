// routes/adminRoutes.js
import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

// An example route accessible only to admin users
router.get(
  "/admin-dashboard",
  authenticateToken,
  authorizeRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard" });
  }
);

export default router;
