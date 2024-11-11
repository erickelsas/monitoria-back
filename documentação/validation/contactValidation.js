const { body, validationResult } = require('express-validator');

// Middleware para validar JSON com chaves name, email, phone e userId para contatos
const validateContact = [
    body('name')
        .notEmpty().withMessage('O nome é obrigatório.')
        .isLength({ min: 3, max: 50 }).withMessage('O nome deve ter entre 3 e 50 caracteres.'),

    body('email')
        .notEmpty().withMessage('O e-mail é obrigatório.')
        .isEmail().withMessage('O e-mail deve ser um endereço de e-mail válido.'),

    body('phone')
        .optional()
        .isNumeric().withMessage('O telefone deve conter apenas números.')
        .isLength({ min: 10, max: 15 }).withMessage('O telefone deve ter entre 10 e 15 dígitos.'),

    body('userId')
        .notEmpty().withMessage('O campo userId é obrigatório.')
        .isInt({ min: 1 }).withMessage('O userId deve ser um inteiro positivo.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateContact };