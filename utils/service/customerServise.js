const Customer = require("../../models/customerModel");
const bcrypt = require("bcryptjs");
const { ErrorHandler } = require("../helpers/errorHelper");
const {
  registerValidation,
  loginValidation,
} = require("../../middleware/validation");

exports.createCustomer = async (data) => {
  const newCustomer = await createCustomerObj(data);
  const customer = await Customer.create(newCustomer);
  if (!customer) throw new ErrorHandler(404, "customer not found");
  return customer;
};

exports.getCustomerByEmail = async (email) => {
  const customer = await Customer.findOne({ email });
  if (!customer) throw new ErrorHandler(404, "customer not found");
  return customer;
};

exports.getCustomerByEmailWithPassword = async (email) => {
  const customer = await Customer.findOne({ email }).select("+password");
  if (!customer) throw new ErrorHandler(404, "customer not found");
  return customer;
};
exports.getCustomerById = async (_id) => {
  const customer = await Customer.findById(_id);
  if (!customer) throw new ErrorHandler(404, "customer not found");
  return customer;
};
exports.getAllCustomers = async () => {
  return await Customer.find({});
};
exports.updateCustomerById = async (_id, data) => {
  return await Customer.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.deleteCustomerById = async (_id) => {
  return await Customer.findByIdAndRemove(_id);
};

exports.isNewCustomer = async (email) => {
  const customer = await Customer.findOne({ email });
  if (customer) throw new ErrorHandler(400, "Customer already exist!");
};
exports.isRegisterDataValide = async (data) => {
  const { error, value } = registerValidation(data);
  if (error) throw new ErrorHandler(400, error.details[0].message);
};
exports.isLogInDataValide = async (data) => {
  const { error, value } = loginValidation(data);
  if (error) throw new ErrorHandler(400, error.details[0].message);
};

const createCustomerObj = async (req) => {
  return {
    firstName: req.firstName,
    lastName: req.lastName,
    email: req.email,
    password: bcrypt.hashSync(req.password, 10),
    phone: req.phone,
  };
};
