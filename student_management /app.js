const express = require('express');
const db = require('./utils/db-connection');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(express.json());

db.connect();

db.createTable();

const PORT = 4000;

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use('/students', studentRoutes);

app.use((req, res) => {
    res.status(404).json({
        status:false,
        message:'Invalid Request'
    });
    return;
})
const server = app.listen(PORT, () => {
    console.log('Server started on port ', PORT);
})

server.on('error', (err) => {
    console.log(err.message);
})