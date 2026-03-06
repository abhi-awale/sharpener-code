const {Sequelize, DataTypes} = require('sequelize');

const db = require('../utils/db-connection');

const User = db.define('User', {
    id : {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name : {
        type:DataTypes.STRING,
        allowNull:false
    },
    email : {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
});

module.exports = User;