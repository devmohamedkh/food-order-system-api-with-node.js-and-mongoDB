const Admin = require("../../models/adminModel");
const bcrypt = require("bcryptjs");
const { ErrorHandler } = require("../helpers/errorHelper");
const {
  registerValidation,
  loginValidation,
} = require("../../middleware/validation");

exports.createAdmin = async (data) => {
  const newAdmin = await createAdminObj(data);
  const admin = await Admin.create(newAdmin);
  if (!admin) throw new ErrorHandler(404, "canot creat admin");
  return admin;
};

exports.getAdminByEmail = async (email) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new ErrorHandler(404, "admin not found");
  return admin;
};
exports.getAdminByEmailWithPassword = async (email) => {
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) throw new ErrorHandler(404, "admin not found");
  return admin;
};
exports.getAdminById = async (_id) => {
  const admin = await Admin.findById(_id);
  if (!admin) throw new ErrorHandler(404, "admin not found");
  return admin;
};
exports.getAllAdmin = async () => {
  return await Admin.find({});
};
exports.updateAdminById = async (_id, data) => {
  return await Admin.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.RemoveAdminById = async (_id) => {
  return await Admin.findByIdAndRemove(_id);
};

exports.isNewAdmin = async (email) => {
  const admin = await Admin.findOne({ email });
  if (admin) throw new ErrorHandler(400, "admin already exist!");
};
exports.isAdminRegisterDataValide = async (data) => {
  const { error, value } = registerValidation(data);
  if (error) throw new ErrorHandler(400, error.details[0].message);
};
exports.isLogInDataValide = async (data) => {
  const { error, value } = loginValidation(data);
  if (error) throw new ErrorHandler(400, error.details[0].message);
};

const createAdminObj = async (req) => {
  return {
    firstName: req.firstName,
    lastName: req.lastName,
    email: req.email,
    password: bcrypt.hashSync(req.password, 10),
    phone: req.phone,
  };
};
