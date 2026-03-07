const express = require('express');
const db = require('./utils/db-connection');
const cors = require('cors')
const response = require('./utils/response');
const postRoutes = require('./routes/postRoutes');

require('./models');

const app = express();
const PORT = 4000;

app.use(express.json());

app.use(cors());

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use('/posts', postRoutes);

app.use((req, res) => {
    response.error(res, {
        message: "Invalid request"
    });
});

db.sync()
    .then(() => {
        app.listen(PORT, ()=>{
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });