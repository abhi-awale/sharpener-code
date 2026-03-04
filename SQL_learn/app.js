const express = require('express');
const mysql = require('mysql2');

const app = express();
const connection = mysql.createConnection({
        host : 'localhost',
        user:'root',
        password : 'root123',
        database: 'test'
    });

connection.connect((err) => {
    if(err) {
        console.log(err);
        return;
    }
    
    console.log('connection has been created!');

    const execStatement = `
    create table students (
        id int primary key,
        username varchar(20) not null,
        email varchar(20)
    );
    `;

    connection.execute(execStatement, (err) => {
        if(err) {
            console.log(err);
            connection.end();
            return;
        }

        console.log('Table created!');
    })
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
})
