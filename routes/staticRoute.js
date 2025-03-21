const express = require("express");
const router = express.Router();
const {
  getStatics,
  getAgentStatics,
  getUserStatics,
} = require("../controllers/staticController");

router.get("/get-statics", getStatics);
router.get("/get-agent-statics", getAgentStatics);
router.get("/get-user-statics", getUserStatics);

module.exports = router;
