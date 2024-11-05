require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { authRoutes, userRoutes } = require('./routes')

app.use(bodyParser.json());

app.use(authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})