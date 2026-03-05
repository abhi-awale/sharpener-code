const {successResponse, errorResponse} = require('../utils/response');
const Student = require('../models/student');

const addNewEntry = async(req, res) => {
    const {name, email} = req.body;

    try{
        const result = await Student.create({
            username : name,
            email : email
        });

        successResponse(res, {
            statusCode : 201,
            message:"Student has been registered successfully!",
            data : result
        });

    } catch(err) {
       return errorResponse(res,{
            statusCode:500,
            message : 'Database error',
            err : err
        });
    }
}

module.exports = {
    addNewEntry
}