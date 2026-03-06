const express = require('express');
const studentController = require('../controller/studentController');

const router = express.Router();

router.post('/', studentController.addNewEntry);

module.exports = router;