const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  star: { type: Number, max: 6 },
  price: { type: String, required: true },
  img: { type: String, required: true },
  hotOffer: { type: Boolean, default: false },
  isSuggest: { type: Boolean, default: false },
  category: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
