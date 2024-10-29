const Joi = require('joi');

// Definição do esquema de validação usando Joi
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(), // 3 a 39 caracteres, obrigatório
    email: Joi.string().email().required(), // formato de email
    age: Joi.number().integer().min(18).max(99).required(), // int de 18 a 99
    category: Joi.string().valid('student', 'professional', 'other').required() // categoria deve ser Estudante, Profissional e Outro
});

// Exportar o esquema para uso em outros arquivos
module.exports = userSchema;