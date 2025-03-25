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
const {
  authMiddleware,
  adminAuthMiddleware,
} = require("../middlewares/authMiddlewares");

router.post("/add-user", AddUser);
router.post("/login", loginUser);
router.get("/log-out", logoutUser);
router.post("/jwt", authMiddleware);
router.get("/all-users", authMiddleware, adminAuthMiddleware, getAllUser);
router.get("/get-user/:email", getUserRole);
router.patch(
  "/update-user/:id",
  authMiddleware,
  adminAuthMiddleware,
  updateUserRole
);
router.put("/update-user-info/:id", updateUserInfo);
router.delete("/delete-user/:id", deleteUser);
module.exports = router;
