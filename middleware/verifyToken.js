const { ErrorHandler } = require("../utils/helpers/errorHelper");
const jwt = require("../utils/helpers/jwt");

const isAuth = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token && !req.admin)
      throw new ErrorHandler(401, "user not authenticated");
    const verifiedUser = jwt.verifyJWT(token);
    req.user = verifiedUser;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyCustomer = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token && !req.admin)
      throw new ErrorHandler(401, "access denied not authenticated");
    if (token) {
      const verifiedCustomer = jwt.verifyJWT(token);
      req.user = verifiedCustomer;
    }
    next();
  } catch (err) {
    next(err);
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.header("admin-token");
  if (!token) throw new ErrorHandler(401, "access denied not authenticated");
  try {
    if (token) {
      const verifiedAdmin = jwt.verifAdminJWT(token);
      req.admin = verifiedAdmin;
    }

    next();
  } catch (err) {
    next(err);
  }
};

const verifyRestaurant = (req, res, next) => {
  const token = req.header("restaurant-token");
  if (!token && !req.admin)
    throw new ErrorHandler(401, "access denied not authenticated");

  try {
    if (token) {
      const verifiedAdmin = jwt.verifRestaurantJWT(token);
      req.user = verifiedAdmin;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyCustomer, verifyAdmin, isAuth, verifyRestaurant };
