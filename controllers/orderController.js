const productServise = require("../utils/service/productServise");
const cartServise = require("../utils/service/cartServise");
const orderServise = require("../utils/service/orderServise");
const { successResponse } = require("../utils/helpers/responsHelper");

exports.createOrder = async (req, res, next) => {
  try {
    const cart = await cartServise.getCart(req.userId);
    await productServise.isProductsInStoke(cart.items);
    const order = await orderServise.creatOrders(cart.items, req.userId);
    await productServise.updateProductsQuantityInStoke(cart.items);
    await cartServise.clearCart(req.userId);
    successResponse(res, order);
  } catch (error) {
    next(error);
  }
};

// don
exports.getOrder = async (req, res, next) => {
  try {
    const orders = await orderServise.getAllOrders(req.userId);
    successResponse(200, orders);
  } catch (error) {
    next(error);
  }
};

// exports.canselOrder = async (req, res) => {
//   try {
//     const cartEmpty = await cartServise.emptyCart();

//     if (!cartEmpty)
//       return res
//         .status(404)
//         .json(errorResponse("cart empty unSuccessfully", 404));

//     return res
//       .status(200)
//       .json(successResponse(cartEmpty, "cart empty Successfully!", 201));
//   } catch (error) {
//     console.log(error);

//     return res
//       .status(400)
//       .json(errorResponse("Could not empty the cart ", 400));
//   }
// };

// exports.RemoveProductfromeOrder = async (req, res) => {
//   try {
//     const deletedproduct = await cartServise.RemoveProductfromeCart(
//       req.userId,
//       req.params.id
//     );

//     if (!deletedproduct)
//       return res.status(404).json(errorResponse("product not deleted", 404));

//     return res
//       .status(200)
//       .json(
//         successResponse(deletedproduct, "delete product Successfully!", 201)
//       );
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(400)
//       .json(errorResponse("Could not delete products ", 400));
//   }
// };
