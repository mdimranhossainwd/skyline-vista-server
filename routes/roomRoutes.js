const express = require("express");
const router = express.Router();
const {
  AddRoom,
  GetRooms,
  GetRoomById,
} = require("../controllers/roomController");

router.post("/add-room", AddRoom);
router.get("/get-rooms", GetRooms);
router.get("/get-room/:id", GetRoomById);
module.exports = router;
