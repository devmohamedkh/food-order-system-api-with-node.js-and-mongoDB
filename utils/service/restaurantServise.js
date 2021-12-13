const Restaurant = require("../../models/restaurantModel");
const bcrypt = require("bcryptjs");
const { ErrorHandler } = require("../helpers/errorHelper");
const {
  restaurantRegisterValidation,
  loginValidation,
} = require("../../middleware/validation");

exports.createRestaurant = async (data) => {
  const newRestaurant = await createRestaurantObj(data);
  const restaurant = await Restaurant.create(newRestaurant);
  if (!restaurant) throw new ErrorHandler(404, "canot creat restaurant");
  return restaurant;
};

exports.getRestaurantByEmail = async (email) => {
  const restaurant = await Restaurant.findOne({ email });
  if (!restaurant) throw new ErrorHandler(404, "Restaurant not found");
  return restaurant;
};
exports.getRestaurantByEmailWithPassword = async (email) => {
  const restaurant = await Restaurant.findOne({ email }).select("+password");
  if (!restaurant) throw new ErrorHandler(404, "Restaurant not found");
  return restaurant;
};
exports.getRestaurantById = async (_id) => {
  const restaurant = await Restaurant.findById(_id);
  if (!restaurant) throw new ErrorHandler(404, "Restaurant not found");
  return restaurant;
};
exports.getAllRestaurant = async () => {
  return await Restaurant.find({});
};
exports.updateRestaurantById = async (_id, data) => {
  return await Restaurant.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.deleteRestaurantById = async (_id) => {
  return await Restaurant.findByIdAndRemove(_id);
};

exports.isNewRestaurant = async (email) => {
  const restaurant = await Restaurant.findOne({ email });
  if (restaurant) throw new ErrorHandler(400, "Restaurant already exist!");
};
exports.isRestaurantRegisterDataValide = async (data) => {
  const { error, value } = restaurantRegisterValidation(data);
  if (error) throw new ErrorHandler(400, error.details[0].message);
};
exports.isLogInDataValide = async (data) => {
  const { error, value } = loginValidation(data);
  if (error) throw new ErrorHandler(400, error.details[0].message);
};

const createRestaurantObj = async (req) => {
  return {
    name: req.name,
    email: req.email,
    password: bcrypt.hashSync(req.password, 10),
    phone: req.phone,
  };
};
