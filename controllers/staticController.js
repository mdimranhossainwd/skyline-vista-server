const mongoose = require("mongoose");
const Statics = require("../models/staticsModel");
const Payment = require("../models/paymentModel");
const Room = require("../models/roomModel");
const User = require("../models/userModel");

const getStatics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRooms = await Room.countDocuments();
    const bookingDetails = await Payment.find(
      {},
      { date: 1, totalPrice: 1 }
    ).lean();
    console.log(bookingDetails);

    const totalPrice = bookingDetails.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );
    console.log(totalPrice);

    res.json({
      totalUsers,
      totalRooms,
      totalBookings: bookingDetails.length,
      totalPrice,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = {
  getStatics,
};
