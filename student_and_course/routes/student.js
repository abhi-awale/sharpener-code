const express = require('express');

const router = express.Router();

const students = [
{ id: 1, name: "Alice" },
{ id: 2, name: "Bob" },
{ id: 3, name: "Charlie" }
];

router.get('/', (req, res) => {
    const result = students.map((data) => data.name);
    res.send(result);
});

router.get('/:id', (req, res) => {
    const {id:studentId} = req.params;

    let student = students.filter((data) =>data.id == studentId).map((data) => data.name);

    if(student.length > 0) {
        res.send(student);
    }else {
        res.send('student not found');
    }
})

module.exports = router;