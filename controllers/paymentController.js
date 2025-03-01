require("dotenv").config();
const Payment = require("../models/paymentModel");
const Wishlist = require("../models/wishlistModel");
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
      amount: wishlist?.room?.amount,
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

module.exports = { AddToPayment, StripeAddPayment, GetRoomPayments };
