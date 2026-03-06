const Booking = require('./booking');
const Bus = require('./bus');
const User = require('./user');

User.hasMany(Booking);
Booking.belongsTo(User);

Bus.hasMany(Booking);
Booking.belongsTo(Bus);

module.exports = {
    Bus,
    User,
    Booking
}