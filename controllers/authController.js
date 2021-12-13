const { comparePassword } = require("../utils/helpers/comparePassword");
const jwtServise = require("../utils/helpers/jwt");
const { successResponse } = require("../utils/helpers/responsHelper");
const adminServise = require("../utils/service/adminServise");
const customerServise = require("../utils/service/customerServise");
const restaurantServise = require("../utils/service/restaurantServise");

exports.customerSignUp = async (req, res, next) => {
  try {
    await customerServise.isRegisterDataValide(req.body);
    await customerServise.isNewCustomer(req.body.email);
    const customer = await customerServise.createCustomer(req.body);
    successResponse(res, customer, 201);
  } catch (error) {
    next(error);
  }
};

exports.customerLogIn = async (req, res, next) => {
  try {
    await adminServise.isLogInDataValide(req.body);
    const customer = await customerServise.getCustomerByEmailWithPassword(
      req.body.email
    );
    comparePassword(req.body.password, customer.password);
    const token = jwtServise.creatJWT(customer._id);
    successResponse(res, { customer, token });
  } catch (error) {
    next(error);
  }
};

exports.restaurantSignUp = async (req, res, next) => {
  try {
    await restaurantServise.isRestaurantRegisterDataValide(req.body);
    await restaurantServise.isNewRestaurant(req.body.email);
    const restaurant = await restaurantServise.createRestaurant(req.body);
    successResponse(res, restaurant, 201);
  } catch (error) {
    next(error);
  }
};

exports.restaurantLogIn = async (req, res, next) => {
  try {
    await restaurantServise.isLogInDataValide(req.body);
    const restaurant = await restaurantServise.getRestaurantByEmailWithPassword(
      req.body.email
    );
    comparePassword(req.body.password, restaurant.password);
    const token = jwtServise.creatRestaurantJWT(restaurant._id);
    successResponse(res, { restaurant, token });
  } catch (error) {
    next(error);
  }
};

exports.adminSignUp = async (req, res, next) => {
  try {
    await isAdminRegisterDataValide(req.body);
    await isNewAdmin(req.body.email);
    const admin = await createAdmin(req.body);
    successResponse(res, admin, 201);
  } catch (error) {
    next(error);
  }
};

exports.adminLogIn = async (req, res, next) => {
  try {
    await adminServise.isLogInDataValide(req.body);

    const admin = await adminServise.getAdminByEmailWithPassword(
      req.body.email
    );

    comparePassword(req.body.password, admin.password);

    const token = await jwtServise.creatAdminJWT(admin._id);

    successResponse(res, { admin, token });
  } catch (error) {
    next(error);
  }
};
