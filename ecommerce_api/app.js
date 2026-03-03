const express = require('express');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

const PORT = 4000;

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);


app.use((req, res ) => {
    res.status = 404;
    res.send('<h1>Invalid Request</h1>');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});