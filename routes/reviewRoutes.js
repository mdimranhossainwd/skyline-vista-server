const express = require("express");
const router = express.Router();
const { AddReview, GetReviews } = require("../controllers/reviewController");

router.post("/add-review", AddReview);
router.get("/get-reviews", GetReviews);

module.exports = router;
