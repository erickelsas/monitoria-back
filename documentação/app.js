require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { authRoutes, userRoutes, contactRoutes } = require('./routes')

app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})