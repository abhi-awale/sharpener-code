const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: "Amount must be a valid number"
        },
        min: {
          args: [0],
          msg: "Amount must be greater than 0"
        }
      }
    },

    paymentMethod: {
      type: DataTypes.ENUM("cash", "upi", "card", "netbanking"),
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "expenses",
    timestamps: true
  }
);

module.exports = Expense;