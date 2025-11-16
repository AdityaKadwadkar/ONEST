const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: "Access denied. No token provided." 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    req.user = decoded; // Attach decoded user to request
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false,
      error: "Invalid or expired token" 
    });
  }
};
