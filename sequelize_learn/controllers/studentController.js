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

const fetchAllEntries = async(req, res) => {
    try{
        const students = await Student.findAll();

        if(students.length == 0) {
            throw new Error('Records not found');
        }
        return successResponse(res, {
            message:"Fatched all records successfully!",
            data:students
        });

    } catch(err) {
       return errorResponse(res, {
            message : err.message,
            err : err
       });
    }
}

const fetchSingleEntry = async(req, res) => {
    const {id} = req.params;
    try{
        const student = await Student.findByPk(id);

        if(!student) {
            throw new Error('Records not found');
        }

        return successResponse(res, {
            message:"Fatched record successfully!",
            data:student
        });

    } catch(err) {
        return errorResponse(res, {
            message : err.message,
            err : err
       });
    }
}

const updateEntry = async(req, res) => {
    const {id} = req.params;

    const {name, email} = req.body;

    try{
        const student = await Student.findByPk(id);

        if(!student) {
            throw new Error('Records not found');
        }

        if(name) {
            student.username = name;
        }

        if(email) {
            student.email = email;
        }

        await student.save();

        return successResponse(res, {
            message:"Record updated successfully!",
            data:student
        });

    } catch(err) {
        return errorResponse(res, {
            message : err.message,
            err : err
       });
    }
}

const deleteEntry = async(req, res) => {
    const {id} = req.params;

    try{

        await Student.destroy({
            where:{
                id:id
            },
            force:true
        });

        return successResponse(res, {
            message:"Record deleted successfully!",
        });

    }catch(err) {
        return errorResponse(res, {
            message : err.message,
            err : err
       });
    }
}

module.exports = {
    addNewEntry,
    fetchAllEntries,
    fetchSingleEntry,
    updateEntry,
    deleteEntry
}