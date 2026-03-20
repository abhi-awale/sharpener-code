const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Category name cannot be empty"
        }
      }
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: "categories",
    timestamps: true
  }
);

module.exports = Category;