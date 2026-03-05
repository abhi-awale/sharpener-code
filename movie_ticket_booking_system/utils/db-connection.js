const {Sequelize} = require('sequelize');

const connection = new Sequelize('movie-booking', 'root', 'root123', {
    host:'localhost',
    dialect: 'mysql',
    logging :false
});

(async() => {
    try {

        await connection.authenticate();

        console.log('Connected to database.');

    } catch(err) {
        console.log('Failed to connect database. ', err);
    }
})();

module.exports = connection;