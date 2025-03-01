const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  offer: {
    type: Object,
  },
  order_Status: {
    type: String,
    default: "Pending",
  },
  offer_date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Offer = new mongoose.model("Offer", offerSchema);
module.exports = Offer;
