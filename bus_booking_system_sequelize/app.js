const express = require('express');
const db = require('./utils/db-connection');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use('/users', userRoutes);
app.use('/buses', busRoutes);

app.use((req, res) => {
    res.status(404).json({status: false, message:'Invalid request!'})
})

db.sync()
    .then(() => {
        app.listen(4000, ()=> {
            console.log('Server running on port 4000!');
        });
    })
    .catch((err) => {
        console.log(err);
    })

