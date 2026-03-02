const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

app.get('/products', (req, res) => {
    res.send('Here is the list of all products.');
})

app.post('/products', (req, res) => {
    res.send('A new product has been added.');
})

app.get('/categories', (req, res) => {
    res.send('Here is the list of all categories.');
})

app.post('/categories', (req, res) => {
    res.send('A new category has been created.');
})

app.use((req, res) => {
    res.set('Content-Type', 'text/html');
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

app.listen(4000, () => {
    console.log('Server started on port 4000');
})