import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getHome(req, res) {
  res.sendFile(path.join(__dirname, "../public/HTML/index.html"));
}

export function getAbout(req, res) {
  res.sendFile(path.join(__dirname, "../public/HTML/about.html"));
}

export function getContact(req, res) {
  res.sendFile(path.join(__dirname, "../public/HTML/contact.html"));
}

export function getUserProfile(req, res) {
  res.sendFile(path.join(__dirname, "../public/HTML/userProfile.html"));
}

export function getBlogPost(req, res) {
  res.sendFile(path.join(__dirname, "../public/HTML/blogPosts.html"));
}

export function getSinglePost(req, res) {
  res.sendFile(path.join(__dirname, "../public/html/singlePost.html"));
}

export function getLogin(req, res) {
  res.sendFile(path.join(__dirname, "../public/HTML/login.html"));
}
export function getRegister(req, res) {
  res.sendFile(path.join(__dirname, "../public/HTML/register.html"));
}
