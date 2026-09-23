const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  star: { type: Number, max: 6 },
  price: { type: String, required: true },
  img: { type: String, required: true },
  hotOffer: { type: Boolean, default: false },
  isSuggest: { type: Boolean, default: false },
  category: { type: String, required: true },
  details: {
    type: String,
    default: "این محصول جزئیات ندارد",
    maxlength: [320, "جزئیات نمی‌تواند بیشتر از 320 کلمه باشد"],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 1,
  },
  show: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
