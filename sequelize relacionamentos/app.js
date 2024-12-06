const express = require('express');
const app = express();
const { sequelize } = require('./models');

const { courseRoutes, studentRoutes, teacherRoutes, courseTeacherRoutes } = require('./routes');

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Banco de dados sincronizado!');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar banco de dados: ', error);
    })

    app.use(express.json());
    app.use('/', studentRoutes);
    app.use('/', teacherRoutes);
    app.use('/', courseRoutes);
    app.use('/', courseTeacherRoutes);


    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });