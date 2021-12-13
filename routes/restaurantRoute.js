const app = require("express").Router();
const restaurantController = require("../controllers/restaurantController");
const { verifyRestaurant } = require("../middleware/verifyToken");

app.get("/", restaurantController.getAllRestaurants);
app.get("/:id", restaurantController.getRestaurantById);
app.patch("/:id", verifyRestaurant, restaurantController.updeteRestaurant);
app.delete("/:id", verifyRestaurant, restaurantController.deleteRestaurant);

module.exports = app;
