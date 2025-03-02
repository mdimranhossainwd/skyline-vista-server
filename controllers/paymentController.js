require("dotenv").config();
const Payment = require("../models/paymentModel");
const Wishlist = require("../models/wishlistModel");
const Offer = require("../models/offerModel");
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
  const { room_id, offer_id } = req.body;
  try {
    let wishlist = await Wishlist.findById(room_id);
    if (!wishlist) {
      return res.status(404).send({ message: "Room not found" });
    }
    if (wishlist) {
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
    }

    let offer = await Offer.findById(offer_id);
    if (!offer) {
      return res.status(404).send({ message: "Offer not found" });
    }
    if (offer) {
      const payment = new Payment({
        offer: offer.offer,
        email: offer.email,
        paymentId: req.body.paymentId,
        amount: offer?.amount,
        status: req.body.status,
        date: new Date(),
      });
      await payment.save();
      if (req.body.status === "successed") {
        await Offer.findByIdAndUpdate(offer_id, { room_status: "Sold" });
      }
      res.status(200).send({
        success: true,
        message: "Payment added successfully",
        payment,
      });
    }

    res.status(404).send({ message: "Room or Offer not found" });
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
};
