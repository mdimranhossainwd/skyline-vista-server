const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(
      token,
      process.env.SKYLINE_VISTA_JWT_TOKEN_SECRET
    );
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    const finalUser = await User.findOne({ email: user?.email });
    res.status(200).send({
      status: true,
      message: "Admin Access Grandted",
      data: finalUser,
    });
    next();
  } catch (err) {
    res.status(400).send({ message: "Unauthorized access", error: err });
  }
};

module.exports = authMiddleware;
