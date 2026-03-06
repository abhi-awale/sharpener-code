const Student = require('./student');
const IdentityCard = require('./identityCard');
const Department = require('./department');
const Course = require('./course');

// one - one association
Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

// one - many association
Department.hasMany(Student);
Student.belongsTo(Department);

// many - many association
Student.belongsToMany(Course, { through: 'StudentCourse'});
Course.belongsToMany(Student, { through: 'StudentCourse'});

module.exports = {
    Student,
    IdentityCard,
    Department,
    Course
}