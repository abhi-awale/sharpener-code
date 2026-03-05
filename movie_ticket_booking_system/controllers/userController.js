const {successResponse, errorResponse} = require('../utils/response');
const User = require('../models/user');

const addNewEntry = async(req, res) => {
    const {name, seatNo} = req.body;

    try{
        const result = await User.create({
            name,
            seatNo
        });

        successResponse(res, {
            statusCode : 201,
            message:"Ticket has been registered successfully!",
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
        const users = await User.findAll();

        // if(users.length == 0) {
        //     throw new Error('Records not found');
        // }
        return successResponse(res, {
            message:"Fatched all records successfully!",
            data:users
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
        const user = await User.findByPk(id);

        if(!user) {
            throw new Error('Records not found');
        }

        return successResponse(res, {
            message:"Fatched record successfully!",
            data:user
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

    const {name, seatNo} = req.body;

    try{
        const user = await User.findByPk(id);

        if(!user) {
            throw new Error('Records not found');
        }

        if(name) {
            user.name = name;
        }

        if(seatNo) {
            user.seatNo = seatNo;
        }

        await user.save();

        return successResponse(res, {
            message:"Record updated successfully!",
            data:user
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

        await User.destroy({
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