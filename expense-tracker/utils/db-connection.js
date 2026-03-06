const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;