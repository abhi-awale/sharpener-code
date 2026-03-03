
const getCartDetails = (req, res) => {
     const {id:userId} = req.params;
    res.send(`Fetching cart for user with ID: ${userId}`);
}

const addProductToCart = (req, res) => {
    const {id:userId} = req.params;
    res.send(`Adding product to cart for user with ID: ${userId}`);
}

module.exports = {
    getCartDetails,
    addProductToCart
}