const {Course} = require('../models');

const addNewEntry = async(req, res) => {
    const {name} = req.body;

    try {
        const course = await Course.create({name});

        res.status(201).json({
            success: true,
            message: "Course created successfully!",
            data: course
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!",
            err: err
        });
    }
}

module.exports = {
    addNewEntry
}