const express = require("express");
const router = express.Router();
const {
  AddToWishlist,
  userWishlistByEmail,
  getAllWishlist,
  deleteWishlistRoom,
} = require("../controllers/wishlistController");

router.post("/add-to-wishlist", AddToWishlist);
router.get("/user-wishlist", userWishlistByEmail);
router.get("/all-wishlist", getAllWishlist);
router.delete("/delete-wishlist-room/:id", deleteWishlistRoom);

module.exports = router;
