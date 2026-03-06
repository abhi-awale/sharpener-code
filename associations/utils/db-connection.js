const {Sequelize} = require('sequelize');

const connection = new Sequelize('associations', 'root', 'root123', {
    host:'localhost',
    dialect: 'mysql',
    logging:false
});

(async()=>{
    try{

        await connection.authenticate()

        console.log('Connection to database has been successful!');
        return;

    } catch(err) {
        console.log('Error while database connection.')
        return;
    }
})();

module.exports = connection;