const mongoose = require("mongoose");

const staticsSchema = new mongoose.Schema(
  {
    total_user: { type: Number },
    total_room: { type: Number },
    total_amount: { type: Number },
    total_booking: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Statics", staticsSchema);
