const express = require('express');
const studentRouter = require('./routes/student');
const courseRouter = require('./routes/course');

const app = express();

const PORT = 4000;

app.use('/students', studentRouter);
app.use('/courses', courseRouter);

app.use((req, res) => {
    res.set('Content-Type', 'text/html');
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})