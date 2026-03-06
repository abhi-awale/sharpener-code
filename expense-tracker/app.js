const express = require('express');
const cors = require('cors');

const sequelize = require('./utils/db-connection');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(express.json());

app.use('/expenses', expenseRoutes);

sequelize.sync()
.then(() => {
    console.log("Database synced");
    app.listen(4000, () => {
        console.log("Server running on port 3000");
    });
})
.catch(err => console.log(err));