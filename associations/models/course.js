const {DataTypes} = require('sequelize');
const db = require('../utils/db-connection');

const Course = db.define('Course', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Course;