const Bus = require('../models/bus');
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

module.exports = {
    addNewBus,
    fetchBusByAvailability
}