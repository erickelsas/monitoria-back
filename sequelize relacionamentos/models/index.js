const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

// Configura o sequelize para conectar ao banco de dados
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: console.log,
});

// Inicializa os modelos
const Student = require('./Student')(sequelize, DataTypes);
const Teacher = require('./Teacher')(sequelize, DataTypes);
const Course = require('./Course')(sequelize, DataTypes);
const CourseTeacher = require('./CourseTeacher')(sequelize, DataTypes);


// Um-para-Muitos: Course -> Student
Course.hasMany(Student, { foreignKey: 'courseId', onDelete: 'SET NULL', as: 'Students' });
Student.belongsTo(Course, { foreignKey: 'courseId', onDelete: 'SET NULL', as: 'Course' });

// Relacionamentos
// Muitos-para-Muitos: Teacher <-> Course
Teacher.belongsToMany(Course, { through: CourseTeacher, as: 'Courses', foreignKey: 'teacherId' });
Course.belongsToMany(Teacher, { through: CourseTeacher, as: 'Teachers', foreignKey: 'courseId' });

module.exports = {
    sequelize,
    Student,
    Teacher,
    Course,
    CourseTeacher
};
