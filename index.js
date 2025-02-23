const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/rooms", roomRoutes);
app.use("/api/rooms", reviewRoutes);

app.listen(process.env.SKYLINE_VISTA_PORT, () => {
  console.log(`Server running on port ${process.env.SKYLINE_VISTA_PORT}`);
});
