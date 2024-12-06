const Teacher = require('./Teacher')
const Course = require('./Course')

module.exports = (sequelize, DataTypes) => {
    const CourseTeacher = sequelize.define('course_teacher', {
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: Course, // refere-se ao modelo Course
                key: 'id',
            },
        },
        teacherId: {
            type: DataTypes.INTEGER,
            references: {
                model: Teacher, // refere-se ao modelo Teacher
                key: 'id',
            },
        },
    });

    return CourseTeacher;
}