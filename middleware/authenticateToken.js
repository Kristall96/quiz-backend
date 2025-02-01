// middleware/authenticateToken.js
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  // Try to get token from the Authorization header
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  // Alternatively, if you want to allow the access token to come from a cookie:
  if (!token && req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Contains { id, role }
    next();
  });
};

export default authenticateToken;
