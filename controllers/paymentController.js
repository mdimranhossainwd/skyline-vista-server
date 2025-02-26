const Payment = require("../models/paymentModel");
const Wishlist = require("../models/wishlistModel");

const AddToPayment = async (req, res) => {
  const { room_id } = req.body;
  try {
    const wishlist = await Wishlist.findById(room_id);
    if (!wishlist) {
      return res.status(404).send({ message: "Room not found" });
    }
    const payment = new Payment({
      room: wishlist.room,
      email: wishlist.email,
      paymentId: req.body.paymentId,
      amount: req.body.amount,
      status: req.body.status,
      date: new Date(),
    });
    await payment.save();
    res.status(200).send({
      success: true,
      message: "Payment added successfully",
      payment,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({ message: "Error adding payment", error: error });
  }
};

module.exports = { AddToPayment };
