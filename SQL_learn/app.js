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
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
})
