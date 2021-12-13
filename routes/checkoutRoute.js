const app = require("express").Router();
const checkoutController = require("../controllers/checkoutController");
const { verifyCustomer } = require("../middleware/verifyToken");

app.get("/", verifyCustomer, checkoutController.getCheckout);

app.get("/success", verifyCustomer, checkoutController.getCheckoutSuccess);

app.get("/cancel", checkoutController.getCheckoutCancel);

module.exports = app;
