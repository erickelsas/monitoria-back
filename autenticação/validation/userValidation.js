const { body, param, validationResult } = require('express-validator');

// Middleware para validar JSON com chaves username e email
const validateUser = [
    body('username')
        .notEmpty().withMessage('O nome de usuário é obrigatório.')
        .isLength({ min: 3, max: 30 }).withMessage('O nome de usuário deve ter entre 3 e 30 caracteres.'),
    body('password')
        .notEmpty().withMessage('A senha é obrigatória.')
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
    body('isAdmin')
        .notEmpty().withMessage('O campo isAdmin é obrigatório.')
        .isBoolean().withMessage('O campo isAdmin deve ser um valor booleano (true ou false).'),
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
