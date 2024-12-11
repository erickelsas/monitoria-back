const mongoose = require('mongoose');
const config = require('../config/config');

const Book = require('./Book')

mongoose.connect(config.uri, config.options).then(() => {
    console.log('MongoDB conectado com sucesso');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
});

module.exports = {
    mongoose,
    Book,
};
