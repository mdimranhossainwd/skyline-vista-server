const express = require("express");
const router = express.Router();
const {
  AddToOffer,
  GetAllOfferRoom,
} = require("../controllers/offerController");

router.post("/add-to-offer", AddToOffer);
router.get("/get-all-offer", GetAllOfferRoom);

module.exports = router;
