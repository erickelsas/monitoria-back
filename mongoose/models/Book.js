const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid year!`
        },
        required: false,
    },
    genre: {
        type: String,
        required: false,
    },
}, {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;