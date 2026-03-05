const express = require('express');
const studentController = require('../controllers/studentController')

const router = express.Router();

router.post('/', studentController.addNewEntry);

router.get('/', studentController.fetchAllEntries);

router.get('/:id', studentController.fetchSingleEntry);

router.put('/:id', studentController.updateEntry);

router.delete('/:id', studentController.deleteEntry);

module.exports = router;