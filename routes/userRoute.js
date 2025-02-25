const express = require("express");
const router = express.Router();

const {
  AddUser,
  loginUser,
  getUserRole,
  updateUserRole,
} = require("../controllers/userController");

router.post("/add-user", AddUser);
router.post("/login", loginUser);
router.get("/get-user/:email", getUserRole);
router.patch("/update-user/:id", updateUserRole);
module.exports = router;
