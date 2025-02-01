import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
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
import cookieParser from "cookie-parser";
import pageRoutes from "./routes/pageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

// ✅ Improved CORS Configuration for Cross-Site Authentication
app.use(
  cors({
    origin: "https://kristall96.github.io", // Make sure this exactly matches your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware
app.use(express.json()); // ✅ Parse JSON data
app.use(express.urlencoded({ extended: true })); // ✅ Parse form data
app.use(cookieParser()); // ✅ Enable cookie parsing

// ✅ Debugging Middleware (Logs Every Request & Cookies)
app.use((req, res, next) => {
  console.log(`🟢 ${req.method} ${req.url}`);
  console.log("🔍 Received Cookies:", req.cookies);
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

// User Routes
app.use("/users", userRoutes);
// Blog Post Routes
app.use("/api", auth);
app.use("/api/blog", blogRouter);
app.use("/api", blogRouter);
app.use("/api/users", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/update", userRoutes);
app.use("/api/updates", userRoutes);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // ✅ 404 Middleware (Handles Unknown Routes)
  app.use((req, res) => {
    res.status(404).json({ error: "Route Not Found" });
  });

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
});
