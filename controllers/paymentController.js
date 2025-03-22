require("dotenv").config();
const Payment = require("../models/paymentModel");
const Wishlist = require("../models/wishlistModel");
const Offer = require("../models/offerModel");
const Room = require("../models/roomModel");
const stripe = require("stripe")(process.env.SKYLINE_VISTA_STRIPE_SECRET_KEY);

const StripeAddPayment = async (req, res) => {
  const { amount } = req.body;
  const paymentAmount = Math.round(parseFloat(amount) * 100);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({ message: "Error adding payment", error: error });
  }
};

const AddToPayment = async (req, res) => {
  try {
    const { roomId, email, name, transID, totalPrice } = req.body;

    // Find the room details
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Create a new payment entry
    const newPayment = new Payment({
      room,
      email,
      name,
      transID,
      totalPrice,
      paymentDate: new Date(),
    });

    await newPayment.save();

    res.status(201).json({
      success: true,
      message: "Payment successful, room booked!",
      data: newPayment,
    });
  } catch (error) {
    console.error("Error adding payment:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const GetRoomPayments = async (req, res) => {
  const { email } = req.query;
  try {
    const payments = await Payment.find({ email });
    res.status(200).send({ success: true, payments });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({ message: "Error fetching payments", error: error });
  }
};

const GetAllRoomPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).send({
      success: true,
      message: "Payments fetched successfully",
      data: payments,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({ message: "Error fetching payments", error: error });
  }
};

const GetRoomPaymentsCompleted = async (req, res) => {
  const { room_status } = req.query;
  try {
    const payments = await Payment.find({ room_status: "Sold" });
    res.status(200).send({ success: true, payments });
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({ message: "Error fetching payments", error: error });
  }
};

module.exports = {
  AddToPayment,
  StripeAddPayment,
  GetRoomPayments,
  GetRoomPaymentsCompleted,
  GetAllRoomPayments,
};
