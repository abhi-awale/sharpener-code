const {Sequelize, DataTypes} = require('sequelize');
const db = require('../utils/db-connection');

const User = db.define('users', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey:true,
        allowNull:false
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    seatNo : {
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = User;