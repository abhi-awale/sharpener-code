const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/', userController.addNewEntry);

router.get('/', userController.fetchAllEntries);

router.get('/:id', userController.fetchSingleEntry);

router.put('/:id', userController.updateEntry);

router.delete('/:id', userController.deleteEntry);

module.exports = router;