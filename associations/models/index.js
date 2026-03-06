const Student = require('./student');
const IdentityCard = require('./identityCard');


Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

module.exports = {
    Student,
    IdentityCard
}