const Category = require("../../models/categoryModel");
const { ErrorHandler } = require("../helpers/errorHelper");

exports.addCategory = async (name) => {
  return await Category.create({ name });
};
exports.isCategoryExist = async (name) => {
  const category = await Category.findOne({ name });
  if (category) throw new ErrorHandler(404, "category  already exist!");
};

exports.getCategoryById = async (_id) => {
  const category = await Category.findById(_id);
  if (!category) throw new ErrorHandler(404, "category not found!");
  return category;
};
exports.getAllCategorys = async () => {
  return await Category.find({});
};
exports.updateCategoryById = async (_id, data) => {
  return await Category.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.deleteCategoryById = async (_id) => {
  return await Category.findByIdAndRemove(_id);
};
