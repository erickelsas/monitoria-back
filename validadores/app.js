const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { body, validationResult } = require('express-validator');

const userSchema = require('./schemas/user');

const app = express();

// Middleware para analisar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configurando o diretório público para servir CSS e outros arquivos estáticos
app.use(express.static('public'));

// Redirecionar para o Joi
app.get('/', (req, res) => {
    res.redirect('/joi');
})

// Rota para exibir o formulário de registro
app.get('/joi', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Rota para processar o registro
app.post('/joi', (req, res) => {
    const { username, email, age, category } = req.body;

    // Validação dos dados usando o Joi
    const { error } = userSchema.validate({ username, email, age, category });
    
    if (error) {
        return res.status(400).send(error.details[0].message); // Envia erro se a validação falhar
    }

    res.send('Registro realizado com sucesso!');
});

// Rota para exibir formulário de registro com express-validator
app.get('/express-validator', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register-validator.html'));
})

// Rota para processar registro usando express-validator
app.post('/express-validator', [
    // Validação dos campos
    body('username')
        .notEmpty().withMessage('O nome de usuário é obrigatório.')
        .isLength({ min: 3, max: 30 }).withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
    
    body('email')
        .notEmpty().withMessage('O email é obrigatório.')
        .isEmail().withMessage('Formato de email inválido.'),
    
    body('age')
        .notEmpty().withMessage('A idade é obrigatória.')
        .isInt({ min: 18, max: 99 }).withMessage('A idade deve ser um número positivo.'),
    
    body('category')
        .notEmpty().withMessage('A categoria é obrigatória.')
        .isIn(['student', 'professional', 'other']).withMessage('Categoria inválida.')
], (req, res) => {
    // Processamento da validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
    }
    
    res.send('Registro processado com sucesso!');
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
