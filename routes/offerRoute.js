const express = require("express");
const router = express.Router();
const {
  AddToOffer,
  GetAllOfferRoom,
  UpdateOfferStatus,
} = require("../controllers/offerController");

router.post("/add-to-offer", AddToOffer);
router.get("/get-all-offer", GetAllOfferRoom);
router.patch("/update-offer-status/:id", UpdateOfferStatus);

module.exports = router;
