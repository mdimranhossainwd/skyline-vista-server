const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  offer: {
    type: Object,
  },
  offer_status: {
    type: String,
    default: "Requested",
  },
  amount: { type: Number },
  offer_date: {
    type: Date,
    default: Date.now,
  },
  email: { type: String },
  name: { type: String },
});

const Offer = new mongoose.model("Offer", offerSchema);
module.exports = Offer;
