const express = require("express");
const router = express.Router();
const {
  AddToOffer,
  GetAllOfferRoom,
  UpdateOfferStatus,
  GetOfferRoomUser,
  GetAgentOwnOfferRoom,
  DeleteOfferRoom,
} = require("../controllers/offerController");

router.post("/add-to-offer", AddToOffer);
router.get("/get-all-offer", GetAllOfferRoom);
router.get("/get-offer-room", GetOfferRoomUser);
router.get("/get-agent-own-offer", GetAgentOwnOfferRoom);
router.patch("/update-offer-status/:id", UpdateOfferStatus);

module.exports = router;
