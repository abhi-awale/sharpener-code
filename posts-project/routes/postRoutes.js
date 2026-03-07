const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/', postController.addNewEntry);

router.get('/', postController.fetchAllEntries);

module.exports = router;