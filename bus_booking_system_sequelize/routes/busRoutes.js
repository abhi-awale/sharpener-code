const express = require('express');
const busController = require('../controllers/busController');

const router = express.Router();

router.post('/', busController.addNewBus);

router.get('/available/:seats', busController.fetchBusByAvailability)

module.exports = router;