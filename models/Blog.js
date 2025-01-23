import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the blog post schema
const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true, // The title is mandatory
    trim: true, // Removes extra spaces from both ends
    maxlength: 150, // Limits the length of the title
  },
  content: {
    type: String,
    required: true, // Blog content is mandatory
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  tags: {
    type: [String], // Array of tags for categorization
    default: [], // Defaults to an empty array
  },
  category: {
    type: String, // Single category for the post
    enum: ["Technology", "Lifestyle", "Travel", "Education", "Other"], // Example categories
    default: "Other",
  },
  published: {
    type: Boolean,
    default: false, // Indicates if the post is published or in draft mode
  },
  publishedAt: {
    type: Date, // Records the publish date
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets to the current date when created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Updated whenever the post is edited
  },
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" }, // Refers to the User model
      comment: { type: String, required: true }, // Comment text
      createdAt: { type: Date, default: Date.now }, // Timestamp for each comment
    },
  ],
  coverImage: {
    type: String, // URL or path to a cover image
    default: null,
  },
  likes: {
    type: Number,
    default: 0, // Count of likes on the post
  },
  views: {
    type: Number,
    default: 0,
  },
});

// Create and export the model
const BlogPost = model("BlogPost", blogPostSchema);
export default BlogPost;
