const express = require("express");
const router = express.Router();
const { getStatics } = require("../controllers/staticController");

router.get("/get-statics", getStatics);

module.exports = router;
