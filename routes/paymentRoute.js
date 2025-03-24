const express = require("express");
const router = express.Router();
const {
  AddToPayment,
  StripeAddPayment,
  GetRoomPayments,
  GetRoomPaymentsCompleted,
  GetAllRoomPayments,
  OfferToPayment,
} = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddlewares");

router.post("/add-to-payment", AddToPayment);
router.post("/offer-add-to-payment", OfferToPayment);
router.post("/create-payment-intent", StripeAddPayment, authMiddleware);
router.get("/get-room-payments", GetRoomPayments, authMiddleware);
router.get("/get-brought-room", GetRoomPaymentsCompleted);
router.get("/get-all-payments", GetAllRoomPayments, authMiddleware);
module.exports = router;
