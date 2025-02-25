const Wishlist = require("../models/wishlistModel");
const Room = require("../models/roomModel");

const AddToWishlist = async (req, res) => {
  const { rooms_id, email } = req.body;
  try {
    const room = await Room.findById(rooms_id);
    if (!room) {
      return res.status(404).send({ message: "Room not found" });
    }
    const wishlist = new Wishlist({
      room,
      email,
    });
    await wishlist.save();
    res.status(200).send({
      success: true,
      message: "Room added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({ message: "Error adding to wishlist", error: error });
  }
};

const userWishlistByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const wishlist = await Wishlist.find({ email });
    res.status(200).send({
      success: true,
      message: "Wishlist fetched successfully",
      data: wishlist,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({ message: "Error fetching wishlist", error: error });
  }
};

const deleteWishlistRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const wishlist = await Wishlist.findOneAndDelete(id);
    if (!wishlist) {
      return res.status(404).send({ message: "Room not found in wishlist" });
    }
    res.status(200).send({
      success: true,
      message: "Room removed from wishlist Successfully",
      wishlist,
    });
  } catch (error) {
    console.log("Error", error);
    res
      .status(400)
      .send({ message: "Error removing room from wishlist", error: error });
  }
};

module.exports = { AddToWishlist, userWishlistByEmail, deleteWishlistRoom };
