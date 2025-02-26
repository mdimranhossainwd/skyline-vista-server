const express = require("express");
const router = express.Router();
const {
  AddRoom,
  GetRooms,
  GetRoomById,
  UpdateRoom,
} = require("../controllers/roomController");

router.post("/add-room", AddRoom);
router.get("/get-rooms", GetRooms);
router.get("/get-room/:id", GetRoomById);
router.put("/update-room/:id", UpdateRoom);
module.exports = router;
