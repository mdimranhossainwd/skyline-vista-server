const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  room: {
    type: Object,
  },
  paymentId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
const Payment = new mongoose.model("Payment", paymentSchema);

module.exports = Payment;
