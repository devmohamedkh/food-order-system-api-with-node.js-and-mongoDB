const app = require("express").Router();

const authController = require("../controllers/authController");

app.post("/login", authController.customerLogIn);
app.post("/signUp", authController.customerSignUp);
app.post("/admin/login", authController.adminLogIn);
app.post("/admin/signUp", authController.adminSignUp);
app.post("/restaurant/login", authController.restaurantLogIn);
app.post("/restaurant/signUp", authController.restaurantSignUp);

module.exports = app;
