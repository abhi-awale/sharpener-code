const express = require('express');
const studentController = require('../controller/studentController');

const router = express.Router();

router.post('/', studentController.addNewEntry);

router.get('/', studentController.fetchAllEntries);

router.post('/:id/courses', studentController.addStudentCourses)

module.exports = router;