const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
    degree: {
        type: String,
        enum: ['Bacharel', 'Mestre', 'Doutor', 'Pós-doutor'],
        default: 'Bacharel'
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;