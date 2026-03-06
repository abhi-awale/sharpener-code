const {Sequelize, DataTypes} = require('sequelize');
const db = require('../utils/db-connection');

const Student = db.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Student;