const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.post('/', studentController.insert);

router.get('/', studentController.fetchAll);

router.get('/:id', studentController.fetch);

router.put('/:id', studentController.update);

router.delete('/:id', studentController.deleteRecord);

module.exports = router;