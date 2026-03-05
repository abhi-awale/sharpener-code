const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.addNewUser);

router.get('/', userController.fetchAllUsers);

module.exports = router;