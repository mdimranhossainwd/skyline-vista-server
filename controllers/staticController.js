const mongoose = require("mongoose");
const Statics = require("../models/staticsModel");
const Payment = require("../models/paymentModel");
const Room = require("../models/roomModel");
const User = require("../models/userModel");

// For Admin Controller
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

// For Agent Controller
const getAgentStatics = async (req, res) => {
  try {
    const agentEmail = req.query.email;
    const totalRoom = await Room.find({ email: agentEmail });
    const totalRoomCount = totalRoom.length;
    const bookings = await Payment.find({ "room.email": agentEmail });

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );

    const chartData = bookings.map((booking) => {
      const created_at = booking?.room?.createdAt;
      const dateObj = new Date(created_at);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      return [`${day}/${month}`, booking?.totalPrice];
    });

    res.send({
      totalRoomCount,
      totalRevenue,
      totalBookings: bookings.length,
      chartData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

module.exports = {
  getStatics,
  getAgentStatics,
};
