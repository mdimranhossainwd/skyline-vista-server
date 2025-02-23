const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  room: {
    type: Object,
    ref: "Room",
    required: true,
  },
});

const Wishlist = new mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
