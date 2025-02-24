const express = require("express");
const router = express.Router();

const {
  AddUser,
  loginUser,
  getUserRole,
} = require("../controllers/userController");

router.post("/add-user", AddUser);
router.post("/login", loginUser);
router.get("/get-user/:email", getUserRole);
module.exports = router;
