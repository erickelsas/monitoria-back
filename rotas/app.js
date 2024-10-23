const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();

// Servir arquivos estáticos da pasta 'css'
app.use(express.static(path.join(__dirname, '/views/css')));

// Rota para Contato
router.get('/contato', (req, res) => {
    // Envia um arquivo como resposta, __dirname diz respeito ao diretório atual
    res.sendFile(path.join(__dirname, '/views/contato.html'));
});

// Rota para Sobre
router.get('/sobre', (req, res) => {
    // Envia um arquivo como resposta, __dirname diz respeito ao diretório atual
    res.sendFile(path.join(__dirname, '/views/sobre.html'));
});

// Rota para Detalhes
router.get('/detalhes', (req, res) => {
    // Envia um arquivo como resposta, __dirname diz respeito ao diretório atual
    res.sendFile(path.join(__dirname, '/views/detalhes.html'));
});

// Usar o router para o caminho base '/empresa'
app.use('/empresa', router);

//redirecionar requisições de / para /empresa/sobre
app.get('/', (req, res) => res.redirect('/empresa/sobre'));

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
