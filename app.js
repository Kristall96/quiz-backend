import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import pageRoutes from "./routes/pageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Fix CORS Configuration (Ensures cookies work with frontend)
app.use(
  cors({
    origin: "https://kristall96.github.io", // ✅ Replace with your frontend URL
    credentials: true, // ✅ Allow sending cookies with requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware
app.use(express.json()); // ✅ Parse JSON data
app.use(express.urlencoded({ extended: true })); // ✅ Parse form data
app.use(cookieParser()); // ✅ Enable cookie parsing for authentication

// ✅ Debugging Middleware (Logs Every Request)
app.use((req, res, next) => {
  console.log(`🟢 ${req.method} ${req.url}`);
  console.log("🔍 Cookies:", req.cookies);
  next();
});

// ✅ API Routes
app.use("/api/auth", authRoutes); // ✅ Authentication Routes
app.use("/api/users", userRoutes); // ✅ User Routes
app.use("/api/blog", blogRouter); // ✅ Blog Routes

// ✅ Page Routes (Static Pages)
app.use("/", pageRoutes);
app.use("/about", pageRoutes);
app.use("/contact", pageRoutes);
app.use("/user-profile", pageRoutes);
app.use("/blog-posts", pageRoutes);
app.use("/singlePost", pageRoutes);
app.use("/login", pageRoutes);
app.use("/register", pageRoutes);

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
