const { body, param, validationResult } = require('express-validator');

// Middleware para validar JSON com chaves username e email
const validateUser = [
    body('username')
        .notEmpty().withMessage('O nome de usuário é obrigatório.')
        .isLength({ min: 3, max: 30 }).withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
    body('email')
        .notEmpty().withMessage('O email é obrigatório.')
        .isEmail().withMessage('Formato de email inválido.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware para validar o parâmetro ID da rota
const validateUserId = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID do usuário deve ser um inteiro positivo.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUser, validateUserId };
