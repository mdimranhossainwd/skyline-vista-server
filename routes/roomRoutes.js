const express = require("express");
const router = express.Router();
const {
  AddRoom,
  GetRooms,
  GetRoomById,
  UpdateRoomStatus,
  UpdateRoom,
  DeleteRoom,
  GetRoomByUserEmail,
} = require("../controllers/roomController");
const authMiddleware = require("../middlewares/authMiddlewares");

router.post("/add-room", AddRoom);
router.get("/get-rooms", GetRooms);
router.get("/get-room/:id", GetRoomById);
router.get("/get-room-by-email", GetRoomByUserEmail, authMiddleware);
router.put("/update-room/:id", UpdateRoom);
router.patch("/update-room-status/:id", UpdateRoomStatus);
router.delete("/delete-room/:id", DeleteRoom, authMiddleware);
module.exports = router;
