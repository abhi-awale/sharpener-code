const {Sequelize, DataTypes} = require('sequelize');

const db = require('../utils/db-connection');

const Student = db.define('students', {
    id : {
        type:DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey:true,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
});

module.exports = Student;