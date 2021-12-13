const app = require("express").Router();
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");
const { verifyCustomer } = require("../middleware/verifyToken");

app.get("/", orderController.getOrder);

app.post("/", verifyCustomer, orderController.createOrder);

/*
    method => delete 
    route  => 
    accses => 
    desc   => 
*/
///not working
// app.delete("/cansel-order", verifyUser, orderController.canselOrder);

/*
    method => post 
    route  => api/product/:id
    accses => only user have the account 
    desc   => to create product
*/
///not working
// app.delete("/:id", verifyUser, orderController.RemoveProductfromeOrder);

module.exports = app;
