const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  room: {
    type: Object,
  },
  email: { type: String },
  name: { type: String },
  transID: { type: String },
  totalPrice: { type: Number },
  paymentDate: { type: Date, default: Date.now },
});
const Payment = new mongoose.model("Payment", paymentSchema);

module.exports = Payment;
