const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies["auth-token"];
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(
      token,
      process.env.SKYLINE_VISTA_JWT_TOKEN_SECRET
    );
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

const adminAuthMiddleware = async (req, res, next) => {
  try {
    // Check if user exists in req from authMiddleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Find user by ID from the token
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    // Add user to request object for later use
    req.authenticatedUser = user;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error during authorization",
      error: err.message,
    });
  }
};

const agentAuthMiddleware = async (req, res, next) => {
  try {
    // Check if user exists in req from authMiddleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Find user by ID from the token
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is admin
    if (user.role !== "agent") {
      return res.status(403).json({
        success: false,
        message: "Agent access required",
      });
    }

    // Add user to request object for later use
    req.authenticatedUser = user;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error during authorization",
      error: err.message,
    });
  }
};

module.exports = { authMiddleware, adminAuthMiddleware, agentAuthMiddleware };
