const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "Exemplo de Swagger",
        description: "Códigos de exemplo para uma aplicação utilizando Swagger"
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
        name: 'Login',
        description: 'Rota relativa a autentificação, gera o Bearer Token'
        },
        {
        name: 'Usuários',
        description: 'Rotas relativas a usuários'
        },
        {
        name: 'Contatos',
        description: 'Rotas relativas a contatos'
        }
    ],
    components: {
        schemas: {
            // Schema do User
            User: {
                    id: {
                        type: "integer",
                        description: "ID do usuário",
                    },
                    username: {
                        type: "string",
                        description: "Nome de usuário",
                        minLength: 3,
                        maxLength: 30
                    },
                    name: {
                        type: "string",
                        description: "Nome completo do usuário",
                        minLength: 3,
                        maxLength: 50
                    },
                    password: {
                        type: "string",
                        description: "Senha do usuário",
                        minLength: 6
                    },
                    isAdmin: {
                        type: "boolean",
                        description: "Indica se o usuário é administrador"
                    }
                },

            // Schema do Contact
            Contact: {
                    id: {
                        type: "integer",
                        description: "ID do contato"
                    },
                    userId: {
                        type: "integer",
                        description: "ID do usuário associado ao contato"
                    },
                    email: {
                        type: "string",
                        description: "Email do contato",
                        format: "email"
                    },
                    phone: {
                        type: "string",
                        description: "Número de telefone do contato",
                        pattern: "^[0-9]{10,15}$"
                    }
                },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Autenticação por token Bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app'); // Inicia o servidor após a geração do arquivo Swagger
});