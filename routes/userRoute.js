const express = require("express");
const router = express.Router();

const { AddUser, loginUser } = require("../controllers/userController");

router.post("/add-user", AddUser);
router.post("/login", loginUser);
module.exports = router;
