import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: { type: String, trim: true, default: "" }, // Optional
  surname: { type: String, trim: true, default: "" }, // Optional
  phoneNumber: {
    type: String,
    trim: true,
    unique: true,
    match: [/^\+?\d{10,15}$/, "Invalid phone number format"],
    default: "",
  }, // Optional
  address: {
    street: { type: String, trim: true, default: "" }, // Optional
    city: { type: String, trim: true, default: "" }, // Optional
    postcode: { type: String, trim: true, default: "" }, // Optional
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "superUser", "moderator", "admin"],
    default: "user",
  },
  points: {
    type: Number,
    default: 0,
  },
  refreshToken: {
    type: String,
    default: null,
  },
});

// Create and export the model
const User = model("User", userSchema);
export default User;
