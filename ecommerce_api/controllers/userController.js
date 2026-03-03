const getAllUsers = (req, res) => {
    res.send('Fetching all users');
}

const addNewUser = (req, res) => {
    res.send('Adding a new user');
}

const getUserDetails = (req, res) => {
    const {id:userId} = req.params;
    res.send(`Fetching user with ID: ${userId}`);
}

module.exports = {
    getAllUsers,
    getUserDetails,
    addNewUser
}