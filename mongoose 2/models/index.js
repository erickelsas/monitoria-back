const mongoose = require('mongoose');
const config = require('../config/config');

const Student = require('./Student');
const Teacher = require('./Teacher');
const Course = require('./Course');
const CourseTeacher = require('./CourseTeacher');

mongoose.connect(config.uri, config.options).then(() => {
    console.log('MongoDB conectado com sucesso');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
});

module.exports = {
    mongoose,
    Student,
    Teacher,
    Course,
    CourseTeacher
};
