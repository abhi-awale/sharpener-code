const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root123',
    database:'student-management-system'
});

connection.createTable = function() {
    const studentsTable = `
        create table if not exists students(
            id int auto_increment primary key,
            name varchar(100),
            email varchar(100) unique,
            age int
        );
    `;

    this.execute(studentsTable, (err) => {
        if(err) {
            console.log(err);
            this.end();
            return;
        }

        console.log('tables created!');
    });
}

module.exports = connection;