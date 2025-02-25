const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: { type: String, default: "user" },
    image: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
