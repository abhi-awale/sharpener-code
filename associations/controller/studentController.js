const {Student, IdentityCard} = require('../models');

const addNewEntry = async(req, res) => {
    const {name, email, cardNumber} = req.body;

    try{
        const student = await Student.create({
            name, email
        });

        if(!student) {
            throw new Error('Failed to create Student.')
        }

        const cardDetails = await student.createIdentityCard({
            cardNumber
        });

        return res.status(201).json({
            success: true,
            message: "Student created successfully!",
            data : { student, cardDetails}
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Request failed!",
            err: err
        });
    }

}

const fetchAllEntries = async(req, res) => {

    try{

        const students = await Student.findAll({
            attributes: ['id', 'name', 'email'],
            include: [{
                model : IdentityCard,
                attributes :['cardNumber']
            }]
        });

        return res.status(201).json({
            success: true,
            message: "Students fetched successfully!",
            data : students
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Request failed!",
            err: err
        });
    }
}


module.exports = {
    addNewEntry,
    fetchAllEntries
}