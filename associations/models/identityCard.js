const {DataTypes} = require('sequelize');
const db = require('../utils/db-connection');

const IdentityCard = db.define('IdentityCard', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cardNumber: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

module.exports = IdentityCard;