const express = require('express');
const studentsRoutes = require('./routes/studentsRoutes');
const db = require('./utils/db-connection');

db.connect();
db.createTable();

const app = express();

const PORT  = 4000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use('/students', studentsRoutes);

app.use((req, res) => {
    res.status(404).json({status:false, message:"Invalid request, check request URI."});
    return;
});

const server = app.listen(PORT, () => {
    console.log('Server running on port 4000');
});

server.on('error', (err) => {
    console.error(err.message);
})
