const express = require("express");
const router = express.Router();
const {
  AddReview,
  GetReviews,
  DeleteReview,
} = require("../controllers/reviewController");

router.post("/add-review", AddReview);
router.get("/get-reviews", GetReviews);
router.delete("/delete-review/:id", DeleteReview);

module.exports = router;
