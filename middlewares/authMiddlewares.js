const jwt = require("jsonwebtoken");

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

module.exports = authMiddleware;
