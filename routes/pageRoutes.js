import { Router } from "express";
import {
  getHome,
  getAbout,
  getContact,
  getUserProfile,
  getBlogPost,
  getSinglePost,
} from "../controllers/pageController.js";

const router = Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.get("/user-profile", getUserProfile);
router.get("/blog-posts", getBlogPost);
router.get("/single-post", getSinglePost);

export default router;
