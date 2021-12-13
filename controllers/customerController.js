const { havePermission } = require("../utils/helpers/havePermission");
const { successResponse } = require("../utils/helpers/responsHelper");
const customerServise = require("../utils/service/customerServise");

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await customerServise.getAllCustomers();
    successResponse(res, customers);
  } catch (error) {
    next(error);
  }
};
exports.getCustomerById = async (req, res, next) => {
  try {
    const customer = await customerServise.getCustomerById(req.params.id);
    successResponse(res, customer);
  } catch (error) {
    next(error);
  }
};

exports.updeteCustomer = async (req, res, next) => {
  try {
    const customerExist = await customerServise.getCustomerById(req.params.id);
    await havePermission(req, customerExist._id);
    const customer = await customerServise.updateCustomerById(
      req.params.id,
      req.body
    );
    successResponse(res, customer);
  } catch (error) {
    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const customerExist = await customerServise.getCustomerById(req.params.id);
    await havePermission(req, customerExist._id);
    const customer = customerServise.deleteCustomerById(req.params.id);
    successResponse(res, customer._id);
  } catch (error) {
    next(error);
  }
};
