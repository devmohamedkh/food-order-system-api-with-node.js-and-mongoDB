const app = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyCustomer } = require("../middleware/verifyToken");

app.get("/", verifyCustomer, cartController.getCart);

app.post("/", verifyCustomer, cartController.addProductTocart);

app.delete("/empty-cart", verifyCustomer, cartController.emptyCart);

app.delete("/:id", verifyCustomer, cartController.RemoveProductfromeCart);

module.exports = app;
