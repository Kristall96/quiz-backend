import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;
const ACCESS_EXPIRY = "15m";
const REFRESH_EXPIRY = "7d";
