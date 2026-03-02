const express = require('express');
const welcomeRouter = require('./routes/welcome');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');

const bookRouter = require('./routes/book');

const app = express();

app.use((req, res, next) => {
  res.set('Content-Type', 'application/json');
  console.log(req.method, req.url);
  next();
});

app.use('/welcome', welcomeRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);

app.use('/books', bookRouter);

app.use((req, res) => {
    res.set('Content-Type', 'text/html');
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

app.listen(4000, () => {
    console.log('Server started on port 4000');
})