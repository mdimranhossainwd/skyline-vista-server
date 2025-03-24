const express = require("express");
const router = express.Router();
const {
  getStatics,
  getAgentStatics,
  getUserStatics,
} = require("../controllers/staticController");
const authMiddleware = require("../middlewares/authMiddlewares");

router.get("/get-statics", getStatics, authMiddleware);
router.get("/get-agent-statics", getAgentStatics, authMiddleware);
router.get("/get-user-statics", getUserStatics, authMiddleware);

module.exports = router;
