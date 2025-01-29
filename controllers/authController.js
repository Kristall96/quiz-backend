import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "User";

const generateAcessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};
