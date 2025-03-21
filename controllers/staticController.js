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
      { room: 1, totalPrice: 1 }
    ).lean();
    console.log(bookingDetails);

    const totalPrice = bookingDetails.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );

    const chartData = bookingDetails.map((booking) => {
      const createdAt = booking?.room?.created_at;
      const dateObj = new Date(createdAt);

      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;

      return [`${day}/${month}`, booking?.totalPrice];
    });

    chartData.unshift(["Date", "Total Price"]);

    console.log(totalPrice);
    console.log(chartData);

    res.json({
      totalUsers,
      totalRooms,
      totalBookings: bookingDetails.length,
      totalPrice,
      chartData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = {
  getStatics,
};
