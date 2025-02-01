import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the schema
const userSchema = new Schema({
  username: {
    type: String,
<<<<<<< HEAD
    required: true, // Makes this field mandatory
    trim: true, // Removes leading/trailing whitespaces
=======
    required: true,
    trim: true,
    unique: true,
>>>>>>> 22e1fcc21fbc39b7ffa17983443bb7ed5a86df75
  },
  email: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true, // Ensures unique email addresses
    lowercase: true, // Converts the email to lowercase
    match: [/\S+@\S+\.\S+/, "Invalid email format"], // Regex for email validation
=======
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
>>>>>>> 22e1fcc21fbc39b7ffa17983443bb7ed5a86df75
  },
  password: {
    type: String,
    required: true,
<<<<<<< HEAD
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
=======
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
>>>>>>> 22e1fcc21fbc39b7ffa17983443bb7ed5a86df75
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
<<<<<<< HEAD
  tokenVersion: {
    type: Number,
    default: 0,
  },
=======
>>>>>>> 22e1fcc21fbc39b7ffa17983443bb7ed5a86df75
});

// Create and export the model
const User = model("User", userSchema);
export default User;
