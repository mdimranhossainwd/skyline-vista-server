const express = require("express");
const router = express.Router();
const { AddReview } = require("../controllers/reviewController");

router.post("/add-review", AddReview);

module.exports = router;
