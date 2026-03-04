const db = require('../utils/db-connection');

const addNewBus = (req, res) => {
    const {busNumber, totalSeats, availableSeats} = req.body;

    const insertQuery = `
        insert into buses(busNumber, totalSeats, availableSeats) values(?,?,?);
    `;

    db.execute(insertQuery, [busNumber, totalSeats, availableSeats], (err) => {
        if(err) {
            console.log(err);
            db.end();
            res.status(500).json({ status:false, message:"Internal server error."});
            return;
        }

        res.status(201).json({ status:false, message:"Bus created successfully!"});
        return;
    });
}

const fetchBusByAvailability = (req, res) => {
    const {seats} = req.params;

    const fetchQuery = `
        select * from buses where availableSeats > ?;
    `;

    db.execute(fetchQuery, [seats], (err,result) => {
        if(err) {
                console.log(err);
                db.end();
                res.status(500).json({ status:false, message:"Internal server error."});
                return;
            }
    
            // console.log(result, fields);
                res.status(200).json({ status:true, message:"buses fetched successfully!", data:result});
                return;
    });
}

module.exports = {
    addNewBus,
    fetchBusByAvailability
}