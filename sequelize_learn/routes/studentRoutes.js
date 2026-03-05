const express = require('express');
const studentController = require('../controllers/studentController')

const router = express.Router();

router.post('/', studentController.addNewEntry);

module.exports = router;