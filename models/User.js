import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true, // Makes this field mandatory
    trim: true, // Removes leading/trailing whitespaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures unique email addresses
    lowercase: true, // Converts the email to lowercase
    match: [/\S+@\S+\.\S+/, "Invalid email format"], // Regex for email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
  createdAt: {
    type: Date,
    default: Date.now, // Sets default value to the current timestamp
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default to a regular user
  },
  role: {
    type: String,
    default: "user",
  },
  points: {
    type: Number,
    default: 0,
  },
});

// Create and export the model
const User = model("User", userSchema);
export default User;
