const path = require('path');

const getAllProducts = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'products.html'));
}

const addNewProduct = (req, res) => {
    res.send('Adding a new product');
}

const getProductDetails = (req, res) => {
    const {id:productId} = req.params;
    res.send(`Fetching product with ID: ${productId}`);
}

module.exports = {
    getAllProducts,
    addNewProduct,
    getProductDetails
}