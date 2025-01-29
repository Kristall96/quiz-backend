import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getHome(req, res) {
  // res.sendFile(path.join(__dirname, "../public/HTML/index.html"));
  res.json({ message: "This is the Home route" });
}

export function getAbout(req, res) {
  // res.sendFile(path.join(__dirname, "../public/HTML/about.html"));
  res.json({ message: "This is the About route" });
}

export function getContact(req, res) {
  // res.sendFile(path.join(__dirname, "../public/HTML/contact.html"));
  res.json({ message: "This is the Contact route" });
}

export function getUserProfile(req, res) {
  // res.sendFile(path.join(__dirname, "../public/HTML/userProfile.html"));
  res.json({ message: "This is the User Profile route" });
}

export function getBlogPost(req, res) {
  // res.sendFile(path.join(__dirname, "../public/HTML/blogPosts.html"));
  res.json({ message: "This is the Blog Posts route" });
}

export function getSinglePost(req, res) {
  // res.sendFile(path.join(__dirname, "../public/html/singlePost.html"));
  res.json({ message: "This is the Single Post route" });
}

export function getLogin(req, res) {
  // res.sendFile(path.join(__dirname, "../public/HTML/login.html"));
  res.json({ message: "This is the Login route" });
}

export function getRegister(req, res) {
  // res.sendFile(path.join(__dirname, "../public/HTML/register.html"));
  res.json({ message: "This is the Register route" });
}
