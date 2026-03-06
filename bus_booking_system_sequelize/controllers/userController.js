const {Sequelize} = require('sequelize');
const {User, Booking, Bus} = require('../models');


const addNewUser = async (req, res) => {
    const {name, email} = req.body;
    try {
        const user = await User.create({
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

const fetchUserBookings = async(req, res) => {
    const {id} = req.params;

    try{

        const query = {
            where: { id },
            attributes: [
                'id',
                [Sequelize.col('Bookings.seatNumber'), 'seatNumber'],
                [Sequelize.col('Bookings.Bus.busNumber'), 'busNumber']
            ],
            include:[
                {
                    model:Booking,
                    attributes:[],
                    include:[{
                        model:Bus,
                        attributes:[]
                    }]
                }
            ],
            raw:true
        }

        const userWithBookingDetails = await User.findAll(query);

        res.status(200).json({
            status: true,
            message: "Record fetched successfully!",
            data: userWithBookingDetails
        });
        return;

    }catch(err) {
        res.status(500).json({ status:false, message:"Internal server error."});
        return;
    }
}

module.exports = {
    addNewUser,
    fetchAllUsers,
    fetchUserBookings
}