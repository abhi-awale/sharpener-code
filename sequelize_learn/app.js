const express = require('express');
const db = require('./utils/db-connection');

const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        status : true,
        message : 'Route working successfully!'
    })
});

// db.sync().then(()=>{
    app.listen(4000, () => {
        console.log('Server running on port 4000');
    })
// }).catch((err) => {
//     console.log(err);
// }); 




