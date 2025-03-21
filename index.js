const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const roomRoutes = require("./routes/roomRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const wishlistRoute = require("./routes/wishlistRoute");
const userRoute = require("./routes/userRoute");
const paymentRoute = require("./routes/paymentRoute");
const offerRoute = require("./routes/offerRoute");
const staticRoute = require("./routes/staticRoute");

const coreOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors(coreOptions));
app.use(cookieParser());

app.use("/api/rooms", roomRoutes);
app.use("/api/rooms", reviewRoutes);
app.use("/api/rooms", wishlistRoute);
app.use("/api/rooms", userRoute);
app.use("/api/rooms", paymentRoute);
app.use("/api/rooms", offerRoute);
app.use("/api/rooms", staticRoute);

app.listen(process.env.SKYLINE_VISTA_PORT, () => {
  console.log(`Server running on port ${process.env.SKYLINE_VISTA_PORT}`);
});
