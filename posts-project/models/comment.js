const {DataTypes} = require('sequelize');
const db = require('../utils/db-connection');

const Comment = db.define('Comment', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    commentText:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Comment;