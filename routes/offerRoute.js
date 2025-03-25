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
const {
  authMiddleware,
  agentAuthMiddleware,
} = require("../middlewares/authMiddlewares");

router.post("/add-to-offer", AddToOffer);
router.get("/get-all-offer", GetAllOfferRoom);
router.get("/get-offer-room", GetOfferRoomUser);
router.get(
  "/get-agent-own-offer",
  authMiddleware,
  agentAuthMiddleware,
  GetAgentOwnOfferRoom
);
router.patch(
  "/update-offer-status/:id",
  authMiddleware,
  agentAuthMiddleware,
  UpdateOfferStatus
);
router.delete("/delete-offer-room/:id", DeleteOfferRoom);
module.exports = router;
