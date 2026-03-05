const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connection has been established successfully!');
    } catch(err) {
        console.log(err);
    }

})();

module.exports = sequelize;