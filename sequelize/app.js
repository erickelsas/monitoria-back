const express = require('express');
const app = express();
const { sequelize } = require('./models');

const { bookRoutes, installRoute } = require('./routes');
    app.use(express.json());

    app.use(bookRoutes);
    app.use(installRoute);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });