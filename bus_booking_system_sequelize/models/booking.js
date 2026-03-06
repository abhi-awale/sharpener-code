const {DataTypes} = require('sequelize');
const db = require('../utils/db-connection');

const Booking = db.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    seatNumber: {
        type:DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Booking;