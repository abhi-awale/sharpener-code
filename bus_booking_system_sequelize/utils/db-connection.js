const {Sequelize} = require('sequelize');

const connection = new Sequelize('bus_booking', 'root', 'root123', {
    host:'localhost',
    dialect:'mysql',
    logging:false
});


(async()=>{
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return;
    }
})();

module.exports = connection;