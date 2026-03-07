const {DataTypes} = require('sequelize');
const db = require('../utils/db-connection');

const Post = db.define('Post', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    link:{
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Post;