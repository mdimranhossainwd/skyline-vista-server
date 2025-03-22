const express = require("express");
const router = express.Router();
const {
  AddToPayment,
  StripeAddPayment,
  GetRoomPayments,
  GetRoomPaymentsCompleted,
  GetAllRoomPayments,
} = require("../controllers/paymentController");

router.post("/add-to-payment", AddToPayment);
router.post("/create-payment-intent", StripeAddPayment);
router.get("/get-room-payments", GetRoomPayments);
router.get("/get-brought-room", GetRoomPaymentsCompleted);
router.get("/get-all-payments", GetAllRoomPayments);
module.exports = router;
