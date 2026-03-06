const express = require('express');
const courseController = require('../controller/courseController');

const router = express.Router();

router.post('/', courseController.addNewEntry);

module.exports = router;