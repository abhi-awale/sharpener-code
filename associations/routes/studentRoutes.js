const express = require('express');
const studentController = require('../controller/studentController');

const router = express.Router();

router.post('/', studentController.addNewEntry);

router.get('/', studentController.fetchAllEntries);

module.exports = router;