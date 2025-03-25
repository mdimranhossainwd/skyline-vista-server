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
const {
  authMiddleware,
  agentAuthMiddleware,
} = require("../middlewares/authMiddlewares");

router.post("/add-room", AddRoom);
router.get("/get-rooms", GetRooms);
router.get("/get-room/:id", GetRoomById);
router.get("/get-room-by-email", GetRoomByUserEmail);
router.put("/update-room/:id", authMiddleware, agentAuthMiddleware, UpdateRoom);
router.patch(
  "/update-room-status/:id",
  authMiddleware,
  agentAuthMiddleware,
  UpdateRoomStatus
);
router.delete("/delete-room/:id", DeleteRoom);
module.exports = router;
