const express = require('express');
const db = require('./utils/db-connection');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use(cors());

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use('/ticket', userRoutes);

app.use((req, res) => {
    console.log('invalid route');
    return res.status(404).json({
        success : false,
        message : 'Invalid request!',
    });
})

db.sync()
    .then(()=>{
        const server = app.listen(4000, ()=>{
            console.log('Server started on port 4000');
        });

        server.on('error', (err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    }); 

