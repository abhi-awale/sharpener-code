const Student = require('./student');
const IdentityCard = require('./identityCard');
const Department = require('./department');

// one - one association
Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

// one - many association
Department.hasMany(Student);
Student.belongsTo(Department);

module.exports = {
    Student,
    IdentityCard,
    Department
}