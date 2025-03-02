const mongoose = require("mongoose");

const purchasePropertySchema = new mongoose.Schema({
  purchase: {
    type: Object,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "brought",
  },
  email: {
    type: String,
    required: true,
  },
});

const Purchase = mongoose.model("purchase", purchasePropertySchema);
module.exports = Purchase;
