const express = require("express");
const router = express.Router();
const {
  AddToPayment,
  StripeAddPayment,
} = require("../controllers/paymentController");

router.post("/add-to-payment", AddToPayment);

module.exports = router;
