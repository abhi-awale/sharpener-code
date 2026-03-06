const {Department} = require('../models');

const addNewEntry = async(req, res) => {
    const {name} = req.body;

    try{

        const department = await Department.create({
            name
        });

        res.status(201).json({
            success: true,
            message: "Department created successfully!",
            data: department
        });

    } catch(err) {
       return res.status(500).json({
            success:false,
            message: "Internal server error!",
            err: err
        });
    }
}


module.exports = {
    addNewEntry
}