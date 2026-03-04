const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.post('/add', studentController.addNewEntry);

router.put('/:id', studentController.updateEntry);

router.delete('/:id', studentController.deleteEntry);

module.exports = router;