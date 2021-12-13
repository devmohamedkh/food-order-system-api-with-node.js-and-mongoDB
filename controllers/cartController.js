const productServise = require("../utils/service/productServise");
const cartServise = require("../utils/service/cartServise");

const { successResponse } = require("../utils/helpers/responsHelper");

exports.addProductTocart = async (req, res, next) => {
  try {
    await productServise.getProductById(req.body.productId);
    const addProductToCart = await cartServise.addProductTocart(
      req.customerId,
      req.body
    );
    successResponse(res, addProductToCart, 201);
  } catch (error) {
    next(error);
  }
};

// don
exports.getCart = async (req, res, next) => {
  try {
    const cart = await cartServise.getCart(req.customerId);
    successResponse(res, cart);
  } catch (error) {
    next(error);
  }
};
// don
exports.emptyCart = async (req, res, next) => {
  try {
    const cartEmpty = await cartServise.clearCart(req.customerId);
    successResponse(res, cartEmpty, 201);
  } catch (error) {
    next(error);
  }
};

exports.RemoveProductfromeCart = async (req, res, next) => {
  try {
    const deletedproduct = await cartServise.RemoveProductfromeCart(
      req.customerId,
      req.params.id
    );

    successResponse(res, deletedproduct, 201);
  } catch (error) {
    next(error);
  }
};
