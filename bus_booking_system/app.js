const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password : 'root123',
    database: 'bus_booking'
});

connection.connect((err) => {
    if(err) {
        console.log(err);
        return;
    }

    console.log('connected to database successfully!');

    const usersTable = `
        create table users(
            id int primary key,
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
        create table buses(
            id int primary key,
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

    const bookingsTable = `
        create table bookings(
            id int primary key,
            seatNumber int
        );
    `;

    connection.execute(bookingsTable, (err) => {
        if(err) {
            console.log(err);
            connection.end();
            return;
        }

        console.log('Bookings table created!');
    });

    const paymentsTable = `
        create table payments(
            id int primary key,
            amountPaid int,
            paymentStatus varchar(20)
        );
    `;

    connection.execute(paymentsTable, (err) => {
        if(err) {
            console.log(err);
            connection.end();
            return;
        }

        console.log('Payments table created!');
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(4000, ()=> {
    console.log('Server running on port 4000!');
})