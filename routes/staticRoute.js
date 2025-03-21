const express = require("express");
const router = express.Router();
const {
  getStatics,
  getAgentStatics,
} = require("../controllers/staticController");

router.get("/get-statics", getStatics);
router.get("/get-agent-statics", getAgentStatics);

module.exports = router;
