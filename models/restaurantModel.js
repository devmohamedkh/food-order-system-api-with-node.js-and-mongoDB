const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    token: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Restaurant", restaurantSchema);
