const express = require('express');
const app = express();
const { sequelize } = require('./models');

const { bookRoutes } = require('./routes');

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Banco de dados sincronizado!');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar banco de dados: ', error);
    })

    app.use(express.json());

    app.use(bookRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });