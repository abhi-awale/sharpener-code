const {Sequelize} = require('sequelize');

const connection = new Sequelize('project-posts', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

(async()=>{
    try{
        await connection.authenticate();

        console.log('Database connected successfully');

    } catch(err) {
        console.log('Failed to connect to database ', err);
        return;
    }
})();

module.exports = connection;