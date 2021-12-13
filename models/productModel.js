const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: {
      type: String,
      lowercase: true,
      required: true,

      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,

      default: 1,
    },
    productImages: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);
productSchema.virtual("Restaurant", {
  ref: "Restaurant",
  localField: "restaurantId",
  foreignField: "_id",
});
module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
