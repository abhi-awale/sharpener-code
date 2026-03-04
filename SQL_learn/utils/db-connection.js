const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root123',
    database:'test'
});

connection.createTable = function() {
    const studentsTable = `
        create table if not exists students(
            id int auto_increment primary key,
            username varchar(20) not null,
            email varchar(20)
        );
    `;

    this.execute(studentsTable, (err) => {
        if(err) {
            console.log(err);
            this.end();
            return;
        }

        console.log('Student table created!');
    });
}

module.exports = connection;