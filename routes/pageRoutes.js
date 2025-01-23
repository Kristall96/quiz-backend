import { Router } from "express";
import {
  getHome,
  getAbout,
  getContact,
  getUserProfile,
  getBlogPost,
  getSinglePost,
  getLogin,
  getRegister,
} from "../controllers/pageController.js";

const router = Router();

router.get("/", getHome);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.get("/user-profile", getUserProfile);
router.get("/blog-posts", getBlogPost);
router.get("/singlePost", getSinglePost);
router.get("/login", getLogin);
router.get("/register", getRegister);

export default router;
