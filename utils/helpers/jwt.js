const jwt = require("jsonwebtoken");

exports.creatJWT = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_KEY, { expiresIn: "30 days" });
};

exports.verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

exports.creatAdminJWT = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_KEY_ADMIN, {
    expiresIn: "30 days",
  });
};

exports.verifAdminJWT = (token) => {
  return jwt.verify(token, process.env.JWT_KEY_ADMIN);
};

exports.creatRestaurantJWT = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_KEY_RESTAURANT, {
    expiresIn: "30 days",
  });
};

exports.verifRestaurantJWT = (token) => {
  return jwt.verify(token, process.env.JWT_KEY_RESTAURANT);
};
