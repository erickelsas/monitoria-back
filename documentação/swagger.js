const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "Exemplo de Swagger",
        description: "Códigos de exemplo para uma aplicação utilizando swagger"
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    components: {
        schemas: {
            // Schema do User
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        description: "ID do usuário"
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
                required: ["username", "name", "password", "isAdmin"]
            },

            // Schema do Contact
            Contact: {
                type: "object",
                properties: {
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
                    },
                    message: {
                        type: "string",
                        description: "Mensagem do contato",
                        maxLength: 500
                    }
                },
                required: ["userId", "email", "phone"]
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                description: 'Autenticação por token Bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app');
});