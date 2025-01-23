import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import pageRoutes from "./routes/pageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import auth from "./routes/auth.js";
dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Page Routes
app.use("/", pageRoutes);
app.use("/about", pageRoutes);
app.use("/contact", pageRoutes);
app.use("/user-profile", pageRoutes);
app.use("/blog-posts", pageRoutes);
app.use("/singlePost", pageRoutes);
app.use("/login", pageRoutes);
app.use("/register", pageRoutes);
// User Routes
app.use("/users", userRoutes);
// Blog Post Routes
app.use("/api", auth);
app.use("/api/blog", blogRouter);
app.use("/api", blogRouter);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
