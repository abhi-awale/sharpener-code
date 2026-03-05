const User = require('../models/user');


const addNewUser = async (req, res) => {
    const {name, email} = req.body;
    try {
        const user = User.create({
            name, email
        });

        res.status(201).json({ status:true, message:"User created successfully!", data: user});
        return;

    } catch(err) {
        res.status(500).json({ status:false, message:"Internal server error."});
        return;
    }
}

const fetchAllUsers = async(req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ status:true, message:"User fetched successfully!", data:users});
        return;

    }catch(err) {
        res.status(500).json({ status:false, message:"Internal server error."});
        return;
    }
}

module.exports = {
    addNewUser,
    fetchAllUsers
}