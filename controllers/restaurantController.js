const { havePermission } = require("../utils/helpers/havePermission");
const { successResponse } = require("../utils/helpers/responsHelper");
const restaurantServise = require("../utils/service/restaurantServise");
// Restaurant
exports.getAllRestaurants = async (req, res, next) => {
  try {
    const customers = await restaurantServise.getAllRestaurant();
    successResponse(res, customers);
  } catch (error) {
    next(error);
  }
};
exports.getRestaurantById = async (req, res, next) => {
  try {
    const customer = await restaurantServise.getRestaurantById(req.params.id);
    successResponse(res, customer);
  } catch (error) {
    next(error);
  }
};

exports.updeteRestaurant = async (req, res, next) => {
  try {
    const customerExist = await restaurantServise.getRestaurantById(
      req.params.id
    );
    await havePermission(req, customerExist._id);
    const customer = await restaurantServise.updateRestaurantById(
      req.params.id,
      req.body
    );
    successResponse(res, customer);
  } catch (error) {
    next(error);
  }
};

exports.deleteRestaurant = async (req, res, next) => {
  try {
    const customerExist = await restaurantServise.getRestaurantById(
      req.params.id
    );
    await havePermission(req, customerExist._id);
    const customer = restaurantServise.deleteRestaurantById(req.params.id);
    successResponse(res, customer._id);
  } catch (error) {
    next(error);
  }
};
