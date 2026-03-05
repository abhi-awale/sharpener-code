const express = require('express');
const db = require('./utils/db-connection');

const studentRoutes = require('./routes/studentRoutes');

const studentModel = require('./models/student');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get('/', (req, res) => {
    return res.status(200).json({
        success : true,
        message : 'Route working successfully!'
    })
});

app.use('/students', studentRoutes);

app.use((req, res) => {
    return res.status(404).json({
        success : false,
        message : 'Invalid request!',
    });
})

db.sync()
    .then(()=>{
        app.listen(4000, () => {
            console.log('Server running on port 4000');
        })
    }).catch((err) => {
        console.log(err);
    }); 