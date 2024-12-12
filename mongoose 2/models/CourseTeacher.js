const mongoose = require('mongoose');

const courseTeacherSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
});

const CourseTeacher = mongoose.model('CourseTeacher', courseTeacherSchema);

module.exports = CourseTeacher;