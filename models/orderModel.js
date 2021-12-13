const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },

      quantity: { type: Number, required: true },
    },
  ],
  customerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
});
orderSchema.virtual("Product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
});
orderSchema.virtual("Customer", {
  ref: "Customer",
  localField: "customerId",
  foreignField: "_id",
});

module.exports = mongoose.model("Order", orderSchema);
