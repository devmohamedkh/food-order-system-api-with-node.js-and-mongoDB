const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  customerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
cartSchema.virtual("Product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
});
cartSchema.virtual("Customer", {
  ref: "Customer",
  localField: "customerId",
  foreignField: "_id",
});
module.exports = mongoose.model("cart", cartSchema);
