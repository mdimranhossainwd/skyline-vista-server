const express = require("express");
const router = express.Router();
const {
  AddToPayment,
  StripeAddPayment,
  GetRoomPayments,
} = require("../controllers/paymentController");

router.post("/add-to-payment", AddToPayment);
router.post("/create-payment-intent", StripeAddPayment);
router.get("/get-room-payments", GetRoomPayments);
module.exports = router;
