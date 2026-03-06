const {Booking} = require('../models');

const addNewEntry = async(req, res) => {
    const {userId, busId, seatNumber} =  req.body;

    try{

        const booking = await Booking.create({
            UserId: userId, BusId: busId, seatNumber
        });

        res.status(201).json({ status:false, message:"Booking created successfully!", data:booking});
        return;

    } catch(err) {
        res.status(500).json({ status:false, message:"Internal server error."});
        return;
    }
}

module.exports = {
    addNewEntry
}