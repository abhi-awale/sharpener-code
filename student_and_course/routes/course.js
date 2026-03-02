const express = require('express');

const router = express.Router();

const courses = [

{ id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },

{ id: 2, name: "Backend", description: "Node.js, Express, MongoDB" }

];

router.get('/', (req, res) => {
     const result = courses.map((data) => data.name);
    res.send(result);
});

router.get('/:id', (req, res) => {
    const {id:courseId} = req.params;

    let course = courses.filter((data) => data.id == courseId).map((data) => data.name);

    if(course.length > 0) {
        res.send(course);
    } else {
        res.send('Course not found');
    }
})

module.exports = router;