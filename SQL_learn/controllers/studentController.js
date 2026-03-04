const db = require('../utils/db-connection');

const addNewEntry = (req, res) => {
    const {name, email} = req.body;

    const addEntry = `
        insert into students(username, email) values(?,?);
    `;

    db.execute(addEntry, [name, email], (err,result) => {
        if(err) {
            console.log(err);
            db.end();
            res.status(500).json({status:false, message:'Database error'});
            return;
        }

        console.log(result);
        res.status(201).json({status:true, message:'Student created successfully!'});
        return;
    });
}

const updateEntry = (req, res) => {
    const studentId = req.params.id;
    const {name} = req.body;

    const updateQuery = `
        update students
        set username = ?
        where id = ?;
    `;

    db.execute(updateQuery, [name, studentId], (err, result) => {
        if(err) {
            console.log(err);
            db.end();
            res.status(500).json({status:false, message:'Database error'});
            return;
        }

        console.log(result);
        res.status(201).json({status:true, message:'Student updated successfully!'});
        return;
    })
}

const deleteEntry = (req, res) => {
    const id = req.params.id;

    const deleteQuery = `
        delete from students where id = ?;
    `;

    db.execute(deleteQuery, [id], (err, result) => {
         if(err) {
            console.log(err);
            db.end();
            res.status(500).json({status:false, message:'Database error'});
            return;
        }

        console.log(result);
        res.status(201).json({status:true, message:'Student deleted successfully!'});
        return;
    })
}

module.exports = {
    addNewEntry,
    updateEntry,
    deleteEntry
}