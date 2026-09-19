const mongoose = require("mongoose");

const registeredSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  isDelivered: { type: Boolean, default: false },
});

module.exports = mongoose.model("Registered", registeredSchema);
