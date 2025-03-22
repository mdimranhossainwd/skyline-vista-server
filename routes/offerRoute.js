const express = require("express");
const router = express.Router();
const {
  AddToOffer,
  GetAllOfferRoom,
  UpdateOfferStatus,
  GetOfferRoomUser,
} = require("../controllers/offerController");

router.post("/add-to-offer", AddToOffer);
router.get("/get-all-offer", GetAllOfferRoom);
router.get("/get-offer-room", GetOfferRoomUser);
router.patch("/update-offer-status/:id", UpdateOfferStatus);

module.exports = router;
