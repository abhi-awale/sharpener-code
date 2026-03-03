const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
    const {id:userId} = req.params;
    res.send(`Fetching cart for user with ID: ${userId}`);
});

router.post('/:id', (req, res) => {
    const {id:userId} = req.params;
    res.send(`Adding product to cart for user with ID: ${userId}`);
});

module.exports = router;