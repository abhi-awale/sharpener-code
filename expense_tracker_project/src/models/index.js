const sequelize = require("../config/database");

const User = require("./user.model");
const Category = require("./category.model");
const Expense = require("./expense.model");

/*
|--------------------------------------------------------------------------
| Model Associations
|--------------------------------------------------------------------------
*/

// User → Expenses
User.hasMany(Expense, {
  foreignKey: "userId",
  as: "expenses",
  onDelete: "CASCADE"
});

Expense.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

// Category → Expenses
Category.hasMany(Expense, {
  foreignKey: "categoryId",
  as: "expenses",
  onDelete: "SET NULL"
});

Expense.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category"
});

/*
|--------------------------------------------------------------------------
| Export Models
|--------------------------------------------------------------------------
*/

const db = {
  sequelize,
  User,
  Category,
  Expense
};

module.exports = db;