const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    type: String,
    default: null,
    maxlength: [200, "آدرس نمی‌تواند بیشت از 200 کاراکتر باشد"],
  },
  isadmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
