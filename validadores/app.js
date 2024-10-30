const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { expressValidatorMiddleware, validateJoi } = require('./middlewares/validation');
const userSchema = require('./schemas/user');

const app = express();

// Middleware para analisar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configurando o diretório público para servir CSS e outros arquivos estáticos
app.use(express.static('public'));

// Redirecionar para o Joi
app.get('/', (req, res) => {
    res.redirect('/joi');
});

// Rota para exibir o formulário de registro com Joi
app.get('/joi', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Rota para processar o registro com Joi
app.post('/joi', validateJoi(userSchema), (req, res) => {
    res.send('Registro realizado com sucesso!');
});

// Rota para exibir formulário de registro com express-validator
app.get('/express-validator', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register-validator.html'));
});

// Rota para processar o registro com express-validator
app.post('/express-validator', expressValidatorMiddleware(), (req, res) => {
    res.send('Registro processado com sucesso!');
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});