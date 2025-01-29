const authorizeRole = (requireRole) => {
  return (req, res, next) => {
    if (req.user.role !== requireRole) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export default authorizeRole;
