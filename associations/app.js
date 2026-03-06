const express = require('express');
const db = require('./utils/db-connection');
const studentRoutes = require('./routes/studentRoutes');

require('./models');

const app = express();
const PORT = 4000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use('/students', studentRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Invalid request!"
    });
})

db.sync()
    .then(()=> {
        app.listen(PORT, ()=>{
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

