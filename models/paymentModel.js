const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  room: {
    type: Object,
  },
});
const Payment = new mongoose.model("Payment", paymentSchema);

module.exports = Payment;
