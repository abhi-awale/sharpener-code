const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/', postController.addNewEntry);

router.get('/', postController.fetchAllEntries);

router.post('/:id/comments', postController.addComment);

router.get('/:id/comments', postController.fetchComments);

module.exports = router;