const express = require("express");
const router = express.Router();
const { AddRoom, GetRooms } = require("../controllers/roomController");

router.post("/add-room", AddRoom);
router.get("/get-rooms", GetRooms);
module.exports = router;
