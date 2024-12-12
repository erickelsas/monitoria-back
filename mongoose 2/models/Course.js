const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: null
    },
    numberOfSemesters: {
        type: Number,
        default: 8
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course