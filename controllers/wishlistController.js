const Wishlist = require("../models/wishlistModel");
const Room = require("../models/roomModel");

const AddToWishlist = async (req, res) => {
  const { rooms_id } = req.body;
  try {
    const room = await Room.findById(rooms_id);
    if (!room) {
      return res.status(404).send({ message: "Room not found" });
    }
    const wishlist = new Wishlist({
      room,
    });
    await wishlist.save();
    res
      .status(200)
      .send({ success: true, message: "Room added to wishlist", wishlist });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({ message: "Error adding to wishlist", error: error });
  }
};

module.exports = { AddToWishlist };
