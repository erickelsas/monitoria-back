const express = require('express');
const app = express();
const connectDB = require('./config/db'); // Função de conexão com MongoDB
const { bookRoutes, installRoute } = require('./routes');

// Conectar ao banco de dados
connectDB();

// Middleware para parsing de JSON
app.use(express.json());

// Rotas
app.use('/api/books', bookRoutes); // Prefixo para rotas de livros
app.use('/api/install', installRoute); // Prefixo para rotas de instalação

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
