const { Expense, Category } = require("../models");

const { success, error, paginated } = require("../utils/response");
const { HTTP_STATUS, MESSAGES } = require("../utils/constants");

/*
|--------------------------------------------------------------------------
| Get All Expenses
|--------------------------------------------------------------------------
*/

exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const { page = 1, limit = 10, categoryId, startDate, endDate } = req.query;

    const offset = (page - 1) * limit;

    const where = { userId };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (startDate && endDate) {
      where.date = {
        [require("sequelize").Op.between]: [startDate, endDate]
      };
    }

    const { count, rows } = await Expense.findAndCountAll({
      where,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"]
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["date", "DESC"]]
    });

    return paginated(
      res,
      "Expenses fetched successfully",
      rows,
      {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count
      }
    );

  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Get Expense By ID
|--------------------------------------------------------------------------
*/

exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOne({
      where: { id, userId },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"]
        }
      ]
    });

    if (!expense) {
      return error(res, MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return success(res, "Expense fetched successfully", expense);

  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Create Expense
|--------------------------------------------------------------------------
*/

exports.createExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const expense = await Expense.create({
      ...req.body,
      userId
    });

    return success(
      res,
      MESSAGES.CREATED,
      expense,
      HTTP_STATUS.CREATED
    );

  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Update Expense
|--------------------------------------------------------------------------
*/

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOne({
      where: { id, userId }
    });

    if (!expense) {
      return error(res, MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    await expense.update(req.body);

    return success(res, MESSAGES.UPDATED, expense);

  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Expense
|--------------------------------------------------------------------------
*/

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOne({
      where: { id, userId }
    });

    if (!expense) {
      return error(res, MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    await expense.destroy();

    return success(res, MESSAGES.DELETED);

  } catch (err) {
    return error(res);
  }
};