const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i.test(v);
            },
            message: 'O e-mail deve ter um formato válido.'
        }
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[0-9]{10,15}$/.test(v);
            },
            message: 'O número de telefone deve conter entre 10 e 15 dígitos.'
        },
        default: null
    },
    course: { // Nome do campo alterado para 'course'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Referência para o modelo Course
        default: null
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;