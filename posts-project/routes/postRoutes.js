const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/', postController.addNewEntry);

router.get('/', postController.fetchAllEntries);

router.post('/:id/comment', postController.addComment);

module.exports = router;