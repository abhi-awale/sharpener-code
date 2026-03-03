
const getAllProducts = (req, res) => {
    res.send('Fetching all products');
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