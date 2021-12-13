const { successResponse } = require("../utils/helpers/responsHelper");
const CategoryServise = require("../utils/service/CategoryServise");

exports.addCategory = async (req, res, next) => {
  try {
    await CategoryServise.isCategoryExist(req.body.name);
    const category = await CategoryServise.addCategory(req.body.name);
    successResponse(res, category, 201);
  } catch (error) {
    next(error);
  }
};
exports.updateCategory = async (req, res, next) => {
  try {
    await CategoryServise.getCategoryById(req.params.id);
    const category = await CategoryServise.updateCategoryById(
      req.params.id,
      req.body
    );

    successResponse(res, category, 201);
  } catch (error) {
    next(error);
  }
};
exports.getAllCategory = async (req, res, next) => {
  try {
    const categorys = await CategoryServise.getAllCategorys();
    successResponse(res, categorys);
  } catch (error) {
    next(error);
  }
};
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryServise.getCategoryById(req.params.id);
    successResponse(res, category);
  } catch (error) {
    next(error);
  }
};
exports.deleteCategoryById = async (req, res, next) => {
  try {
    await CategoryServise.getCategoryById(req.params.id);
    const category = await CategoryServise.deleteCategoryById(req.params.id);
    successResponse(res, category._id, 200);
  } catch (error) {
    next(error);
  }
};
