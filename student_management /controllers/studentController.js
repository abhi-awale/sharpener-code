const db = require('../utils/db-connection');

const insert = (req, res) => {
    const { name, email, age } = req.body;

    const insertQuery = `
        insert into students(name, email, age) values(?,?,?);
    `;

    db.execute(insertQuery, [name, email, age], (err) => {
        if (err) {
            console.log(err);
            db.end();
            res.status(500).json({ status: false, message: 'Database error' });
            return;
        }

        res.status(201).json({ status: true, message: 'Student created successfully!' });
        return;
    });
}

const fetchAll = (req, res) => {

    const fetchQuery = `
        select * from students;
    `;

    db.execute(fetchQuery, (err, result) => {
        if (err) {
            console.log(err);
            db.end();
            res.status(500).json({
                status: false,
                message: 'Database error'
            });
            return;
        }
        res.status(200).json({ status: true, message: 'Students fetch successfully!', data: result });
        return;
    })
}

const fetch = (req, res) => {
    const { id } = req.params;

    const fetchQuery = `
        select * from students where id = ?;
    `;

    db.execute(fetchQuery, [id], (err, result) => {
        if (err) {
            console.log(err);
            db.end();
            res.status(500).json({
                status: false,
                message: 'Database error'
            });
            return;
        }

        if (result.length > 0) {
            res.status(200).json({ status: true, message: 'Students fetch successfully!', data: result });
            return;
        } else {
            res.status(200).json({ status: false, message: 'Students not found!' });
            return;
        }
    })
}

const update = (req, res) => {
    const { id } = req.params;

    const { name, email } = req.body;

    const fetchQuery = `
        select * from students where id = ?;
    `;

    db.execute(fetchQuery, [id], (err, result) => {
        if (err) {
            console.log(err);
            db.end();
            res.status(500).json({
                status: false,
                message: 'Database error'
            });
            return;
        }

        if (result.length > 0) {
            const updateQuery = `
                update students set name = ?, email = ? where id = ?;
            `;

            db.execute(updateQuery, [name, email, id], (err, result) => {
                if (err) {
                    console.log(err);
                    db.end();
                    res.status(500).json({
                        status: false,
                        message: 'Database error'
                    });
                    return;
                }

                res.status(200).json({ status: true, message: 'Students updated successfully!'});
                return;
            });
        } else {
            res.status(200).json({ status: false, message: 'Students not found!' });
            return;
        }
    });
}

const deleteRecord = (req, res) => {
    const { id } = req.params;

    const deleteQuery = `
        delete from students where id = ?;
    `;

    db.execute(deleteQuery, [id], (err) => {
        if(err) {
            console.log(err);
            db.end();
            res.status(500).json({
                status:false,
                message:'database error'
            });
            return;
        }

        res.status(200).json({
            status: true,
            message: 'Student deleted successfully!'
        });
        return;
    })
}


module.exports = {
    insert,
    fetchAll,
    fetch,
    update,
    deleteRecord
}