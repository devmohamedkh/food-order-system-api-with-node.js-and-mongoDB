const checkoutServise = require("../utils/service/checkoutServise");
const cartServise = require("../utils/service/cartServise");
const orderController = require("./orderController");
const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.getCheckout = async (req, res, next) => {
  try {
    const cart = await cartServise.getCartFor(req.userId);
    const session = await checkoutServise.checkoutSessionsCreate(
      cart.items,
      req
    );
    successResponse(201, {
      sessionId: session.id,
      products: cart.items,
    });
  } catch (error) {
    next(error);
  }
};
exports.getCheckoutSuccess = async (req, res) => {
  orderController.createOrder(req, res);
};
exports.getCheckoutCancel = async (req, res) => {
  return res.status(400).json({
    massage: "the checkOut is cansel",
    statusCode: 400,
  });
};
