const express = require("express");
const router = express.Router();
const { AddToOffer } = require("../controllers/offerController");

router.post("/add-to-offer", AddToOffer);

module.exports = router;
