const app = require("express").Router();
const customerController = require("../controllers/customerController");
const { verifyCustomer } = require("../middleware/verifyToken");

// r
app.get("/", customerController.getAllCustomers);
// c 1
app.get("/:id", customerController.getCustomerById);
// u
app.patch("/:id", verifyCustomer, customerController.updeteCustomer);
// d
app.delete("/:id", verifyCustomer, customerController.deleteCustomer);

module.exports = app;
