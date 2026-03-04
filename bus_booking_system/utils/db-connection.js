const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root123',
    database:'bus_booking'
});

connection.createTables = function() {
    const usersTable = `
        create table if not exists users(
            id int auto_increment primary key,
            name varchar(20) not null,
            email varchar(20) not null
        );
    `;

    connection.execute(usersTable, (err) => {
        if(err) {
            console.log(err);
            connection.end();
            return;
        }

        console.log('Users table created!');
    });

    const busesTable = `
        create table if not exists buses(
            id int auto_increment primary key,
            busNumber int not null,
            totalSeats int,
            availableSeats int
        );  
    `;

    connection.execute(busesTable, (err) => {
        if(err) {
            console.log(err);
            connection.end();
            return;
        }

        console.log('Buses table created!');
    });
}

module.exports = connection;