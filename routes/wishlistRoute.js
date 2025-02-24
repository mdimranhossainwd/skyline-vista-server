const express = require("express");
const router = express.Router();
const {
  AddToWishlist,
  userWishlistByEmail,
} = require("../controllers/wishlistController");

router.post("/add-to-wishlist", AddToWishlist);
router.get("/user-wishlist", userWishlistByEmail);

module.exports = router;
