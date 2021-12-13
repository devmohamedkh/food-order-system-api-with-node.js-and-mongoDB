const { addProductValidation } = require("../../middleware/validation");
const Product = require("../../models/ProductModel");
const { ErrorHandler } = require("../helpers/errorHelper");
const { successResponse } = require("../helpers/responsHelper");
exports.addProduct = async (data) => {
  return await Product.create(data);
};

exports.getProductById = async (_id) => {
  const product = await Product.findById(_id);
  if (!product) throw ErrorHandler(404, "Product not found");
  return product;
};
exports.getAllProduct = async () => {
  return await Product.find({});
};
exports.updateProductById = async (_id, data) => {
  return await Product.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.deleteProductById = async (_id) => {
  return await Product.findByIdAndRemove(_id);
};
exports.RemoveProduct = async (_id, userId) => {
  return await Product.deleteOne({ _id: _id, userId: userId });
};

exports.isProductsInStoke = async (products) => {
  for (let i = 0; i < products.length; i++) {
    const itemQuantityInStoke = products[i].productId.quantity;
    if (products[i].quantity > itemQuantityInStoke)
      throw new ErrorHandler(
        200,
        `the prodect is out of stock - ${products[i].name}`
      );
  }
};

exports.updateProductsQuantityInStoke = async (products) => {
  for (let i = 0; i < products.length; i++) {
    const updateQuantity =
      products[i].productId.quantity - products[i].quantity;
    console.log(products[i].productId._id);
    await Product.findByIdAndUpdate(
      products[i].productId._id,
      {
        $set: {
          quantity: updateQuantity,
        },
      },
      { new: true }
    );
  }
};

exports.isProductDataValide = async (data) => {
  const { error, value } = addProductValidation(data);
  if (error) throw new ErrorHandler(400, error.details[0].message);
};

// exports.isProductsInStoke = async (products, res) => {
//   for (let i = 0; i < products.length; i++) {
//     const itemInStoke = await Product.findById({
//       _id: products[i].productId,
//     });
//     if (products[i].quantity > itemInStoke.quantity)
//       return res.status(200).json(
//         successResponse(
//           {
//             name: itemInStoke.name,
//             desc: "the prodect is out of stock",
//           },
//           "order filler",
//           200
//         )
//       );
//   }
// };

// exports.updateProductsQuantityInStoke = async (products) => {
//   for (let i = 0; i < products.length; i++) {
//     const itemInStoke = await Product.findById({
//       _id: products[i].productId,
//     });
//     const updateQuantity = itemInStoke.quantity - cart.items[i].quantity;
//     await Product.findByIdAndUpdate(
//       products[i].productId,
//       {
//         $set: {
//           quantity: updateQuantity,
//         },
//       },
//       { new: true }
//     );
//   }
// };
