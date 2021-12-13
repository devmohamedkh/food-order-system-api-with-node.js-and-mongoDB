const app = require("express").Router();
const productController = require("../controllers/productController");
const { verifyRestaurant } = require("../middleware/verifyToken");

app.get("/", productController.getAllProduct);
app.get("/:id", productController.getProductById);
app.post("/", verifyRestaurant, productController.addProduct);
app.patch("/:id", verifyRestaurant, productController.updateProduct);
app.delete("/:id", verifyRestaurant, productController.deleteProductById);

module.exports = app;
