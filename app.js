const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/helpers/db");
require("dotenv").config();
const app = express();

const { handleError } = require("./utils/helpers/errorHelper");
const { isAdmin } = require("./utils/helpers/isAdmin");
const authRoute = require("./routes/authRoute");
const customerRoute = require("./routes/customerRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const checkoutRoute = require("./routes/checkoutRoute");

//=====================
// MIDDLEWARE
//=====================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//=====================
// ADMIN MIDDLEWARE
//=====================
app.use((req, res, next) => {
  isAdmin(req, res, next);
});
//=====================
// ROUTES
//=====================
app.use("/api/auth", authRoute);
app.use("/api/customer", customerRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/order", orderRoute);

// 404 error
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    statusCode: 404,
    massage: "404 - page not found!",
  });
});
// error handeler mid
app.use((err, req, res, next) => {
  handleError(err, res);
});

connectDB();
app.listen(process.env.PORT, () =>
  console.log(` listening on port ${process.env.PORT}!`)
);
