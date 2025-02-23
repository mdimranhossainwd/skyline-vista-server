const express = require("express");
const router = express.Router();
const { AddRoom } = require("../controllers/roomController");

router.post("/add-room", AddRoom);
module.exports = router;
