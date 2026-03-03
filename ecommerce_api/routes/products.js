const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.post('/', productController.addNewProduct);

router.get('/:id', productController.getProductDetails);

module.exports = router;