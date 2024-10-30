const express = require('express');
const { body, validationResult } = require('express-validator');
const CustomError = require('../middlewares/CustomError'); // Classe de erro personalizada

const router = express.Router();

// Rota para criação de usuário com validação
router.post(
    '/',
    // Middleware de validação
    [
        body('name')
            .isString().withMessage('O nome deve ser uma string')
            .notEmpty().withMessage('O nome é obrigatório')
            .isLength({ min: 3, max: 30 }).withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
        body('email')
            .isEmail().withMessage('E-mail inválido')
            .notEmpty().withMessage('O e-mail é obrigatório'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Lança um erro personalizado se a validação falhar
            const errorMessages = errors.array().map(err => err.msg);
            return next(new CustomError(400, errorMessages.join(', ')));
        }

        try {
            const { name, email } = req.body;

            // Simula o cadastro de um novo usuário
            const newUser = { name, email };

            res.status(201).json(newUser);
        } catch (error) {
            next(error);  // Passa o erro para o middleware de erro
        }
    }
);

module.exports = router;
