const {Sequelize, DataTypes} = require('sequelize');

const db = require('../utils/db-connection');

const Bus = db.define('buses', {
    id : {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    busNumber : {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    totalSeats : {
        type:DataTypes.INTEGER,
        allowNull:true
    },
    availableSeats : {
        type:DataTypes.INTEGER,
        allowNull:true
    }
});

module.exports = Bus;