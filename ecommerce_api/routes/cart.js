const express = require('express');
const cartController = require('../controllers/cartController')

const router = express.Router();

router.get('/:id', cartController.getCartDetails);

router.post('/:id', cartController.addProductToCart);

module.exports = router;