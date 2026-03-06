const express = require('express');
const departmentController = require('../controller/departmentController');

const router = express.Router();

router.post('/', departmentController.addNewEntry);

module.exports = router;