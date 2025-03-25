const express = require("express");
const router = express.Router();
const {
  getStatics,
  getAgentStatics,
  getUserStatics,
} = require("../controllers/staticController");
const {
  authMiddleware,
  adminAuthMiddleware,
  agentAuthMiddleware,
} = require("../middlewares/authMiddlewares");

router.get("/get-statics", authMiddleware, adminAuthMiddleware, getStatics);
router.get(
  "/get-agent-statics",
  authMiddleware,
  agentAuthMiddleware,
  getAgentStatics
);
router.get("/get-user-statics", getUserStatics);

module.exports = router;
