const express = require("express");
const router = express.Router();

const {
  AddUser,
  loginUser,
  getUserRole,
  updateUserRole,
  deleteUser,
  logoutUser,
  getAllUser,
  updateUserInfo,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddlewares");

router.post("/add-user", AddUser);
router.post("/login", loginUser);
router.get("/log-out", logoutUser);
router.get("/all-users", getAllUser, authMiddleware);
router.post("/jwt", authMiddleware);
router.get("/get-user/:email", getUserRole);
router.patch("/update-user/:id", updateUserRole);
router.put("/update-user-info/:id", updateUserInfo);
router.delete("/delete-user/:id", deleteUser, authMiddleware);
module.exports = router;
