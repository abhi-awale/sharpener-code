const express = require('express');
const db = require('./utils/db-connection');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get('/ticket', (req, res) => {
    return res.status(200).json({data:[]});
});

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

