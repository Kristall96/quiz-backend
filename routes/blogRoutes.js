import express from "express";
import BlogPost from "../models/Blog.js"; // Corrected from Blog to BlogPost

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      title,
      content,
      author,
      tags,
      category,
      published,
      comments,
      coverImage,
      likes,
    } = req.body;

    const newPost = new BlogPost({
      title,
      content,
      author, // This should be the ObjectId of the author (user)
      tags,
      category,
      published,
      comments,
      coverImage,
      likes,
    });

    const savePost = await newPost.save();
    res.status(201).json(savePost);
  } catch (error) {
    res.status(400).json({ error: "Failed to create post" });
  }
});
router.get("/blogs", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// for the side bar Max limit 5
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ views: -1 }).limit(5);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: `Internal server error` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id/views", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
