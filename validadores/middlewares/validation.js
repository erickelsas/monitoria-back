const { body, validationResult } = require('express-validator');

// Middleware de validação com Joi
const validateJoi = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

// Função para criar um middleware de validação com express-validator
const expressValidatorMiddleware = () => [
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
        .isIn(['student', 'professional', 'other']).withMessage('Categoria inválida.'),
    
    // Middleware final para verificar o resultado da validação
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Exportando as funções
module.exports = {
    validateJoi,
    expressValidatorMiddleware
};
