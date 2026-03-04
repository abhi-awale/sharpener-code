const db = require('../utils/db-connection');

const addNewUser = (req, res) => {
    const {name, email} = req.body;

    const insertQuery = `
        insert into users(name, email) values(?,?);
    `;

    db.execute(insertQuery, [name, email], (err) => {
        if(err) {
            console.log(err);
            db.end();
            res.status(500).json({ status:false, message:"Internal server error."});
            return;
        }

        res.status(201).json({ status:true, message:"User created successfully!"});
        return;
    });
}

const fetchAllUsers = (req, res) => {

    const fetchQuery = 'Select * from users;';

    db.execute(fetchQuery, (err, result, fields) => {
        if(err) {
            console.log(err);
            db.end();
            res.status(500).json({ status:false, message:"Internal server error."});
            return;
        }

        // console.log(result, fields);
         res.status(200).json({ status:true, message:"User fetched successfully!", data:result});
         return;

    })
}

module.exports = {
    addNewUser,
    fetchAllUsers
}