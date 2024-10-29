const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();
const adminRouter = express.Router();

// Servir arquivos estáticos da pasta 'css'
app.use(express.static(path.join(__dirname, '/public')));

// Middleware para analisar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do middleware de sessão
app.use(session({
    secret: 'chave-secreta', // Troque por uma chave segura em produção
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Importa o middleware de log
const { log, validateNumber, isAuthenticated } = require('./middlewares/middleware');

// Aplica o middleware de log globalmente
app.use(log);

// Define a rota principal
app.get('/', (req, res) => {
    res.send('<p>Olá! Sua requisição foi aceita e logada.</p>');
});

// Rota que valida os números
app.get('/validarNumero', validateNumber, (req, res) => {
    res.send(`<p>O número enviado foi: ${req.query.number}</p>`)
})

// Aplicando o middleware de autenticação para todas as rotas dentro de adminRouter
adminRouter.use(isAuthenticated);

// Exemplo de rotas administrativas
adminRouter.get('/dashboard', (req, res) => {
    res.send('Bem-vindo ao painel de administração!');
});

adminRouter.get('/settings', (req, res) => {
    res.send('Configurações do administrador');
});

// Registrando o grupo de rotas no app principal
app.use('/admin', adminRouter);

// Rota de login como exemplo
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

// Rota para validar o login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if(username != 'admin' || password != 'admin'){
        res.send('Senha incorreta, tente novamente');
    }

    req.session.user = { id: 1, username: 'admin' };
    res.redirect('/admin/dashboard');
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
