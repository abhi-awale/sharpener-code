const {Sequelize} = require('sequelize');
const {Bus, User, Booking} = require('../models');
const { Op } = require("sequelize");

const addNewBus = async(req, res) => {
    const {busNumber, totalSeats, availableSeats} = req.body;

    try{
        const bus = await Bus.create({
            busNumber, totalSeats, availableSeats
        });
        res.status(201).json({ status:false, message:"Bus created successfully!", data:bus});
        return;

    }catch(err) {
        res.status(500).json({ status:false, message:"Internal server error."});
        return;
    }
}

const fetchBusByAvailability = async(req, res) => {
    const {seats} = req.params;

    try{

        const buses = await Bus.findAll({
            where : {
                availableSeats :{ 
                    [Op.gt]: seats
                }
            },
         logging: console.log
        });

        if(buses.length == 0) {
            res.status(404).json({ status:false, message:"Records not found"});
            return;
        }
        res.status(200).json({ status:true, message:"buses fetched successfully!", data:buses});
        return;
    } catch(err) {
        console.log(err);
        res.status(500).json({ status:false, message:"Internal server error."});
        return;
    }
}

const fetchBookingsByBus = async(req, res) => {
    const {id} = req.params;

    try{

        const query = {
            where: { id },
            attributes: [
                'id',
                [Sequelize.col('Bookings.seatNumber'), 'seatNumber'],
                [Sequelize.col('Bookings.User.name'), 'user.name'],
                [Sequelize.col('Bookings.User.email'), 'user.email'],
            ],
            include:[
                {
                    model:Booking,
                    attributes:[],
                    include:[{
                        model:User,
                        attributes:[]
                    }]
                }
            ],
            raw:true
        }

        const busWithBookingDetails = await Bus.findAll(query);

        res.status(200).json({
            status: true,
            message: "Record fetched successfully!",
            data: busWithBookingDetails
        });
        return;

    } catch(err) {
        console.log(err);
        res.status(500).json({ status:false, message:"Internal server error."});
        return;
    }
}

module.exports = {
    addNewBus,
    fetchBusByAvailability,
    fetchBookingsByBus
}