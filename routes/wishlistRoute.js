const express = require("express");
const router = express.Router();
const { AddToWishlist } = require("../controllers/wishlistController");

router.post("/add-to-wishlist", AddToWishlist);

module.exports = router;
