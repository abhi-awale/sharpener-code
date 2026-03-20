const { Category } = require("../models");

const { success, error } = require("../utils/response");
const { HTTP_STATUS, MESSAGES } = require("../utils/constants");

/*
|--------------------------------------------------------------------------
| Get All Categories
|--------------------------------------------------------------------------
*/

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["createdAt", "DESC"]]
    });

    return success(res, "Categories fetched successfully", categories);
  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Get Category By ID
|--------------------------------------------------------------------------
*/

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return error(res, MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return success(res, "Category fetched successfully", category);
  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({
      where: { name }
    });

    if (existingCategory) {
      return error(
        res,
        "Category already exists",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const category = await Category.create({
      name,
      description
    });

    return success(
      res,
      MESSAGES.CREATED,
      category,
      HTTP_STATUS.CREATED
    );
  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return error(res, MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    await category.update(req.body);

    return success(res, MESSAGES.UPDATED, category);
  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return error(res, MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    await category.destroy();

    return success(res, MESSAGES.DELETED);
  } catch (err) {
    return error(res);
  }
};