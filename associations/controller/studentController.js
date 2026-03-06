const {Student, IdentityCard, Department} = require('../models');

const addNewEntry = async(req, res) => {
    const {name, email, departmentId, cardNumber} = req.body;

    try{
        const student = await Student.create({
            name, email, DepartmentId: departmentId
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

    const {departmentId} = req.query;

    try{
        let query = {
            attributes: ['id', 'name', 'email'],
            include: [{
                model : IdentityCard,
                attributes :[['cardNumber', 'cardNo']]
            },{
                model: Department,
                attributes:[['name', 'department']]
            }],
            raw: true
        }

        if(departmentId) {
            query.where = {
                DepartmentId : departmentId
            }
        }

        const students = await Student.findAll(query);

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