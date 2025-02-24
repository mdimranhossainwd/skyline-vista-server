const mongoose = require("mongoose");
const Room = require("./roomModel");

const wishlistSchema = new mongoose.Schema({
  room: {
    type: Object,
    required: true,
  },
});

const Wishlist = new mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
