const express = require("express");
const router = express.Router();

const {
  AddUser,
  loginUser,
  getUserRole,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddlewares");

router.post("/add-user", AddUser);
router.post("/login", loginUser);
router.post("/jwt", authMiddleware);
router.get("/get-user/:email", getUserRole);
router.patch("/update-user/:id", updateUserRole);
router.delete("/delete-user/:id", deleteUser);
module.exports = router;
