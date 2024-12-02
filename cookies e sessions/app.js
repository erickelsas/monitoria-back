const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware para arquivos estáticos
app.use(express.static(__dirname + "/public"));

// Middleware para processamento de cookies
app.use(cookieParser());

// Middleware para processamento de sessões
app.use(
  session({
    secret: "segredo", // Chave usada para criptografar os dados da sessão
    resave: false, // Salva a sessão apenas se houve modificação
    saveUninitialized: true, // Salva sessões não inicializadas
    cookie: { secure: false }, // Para https, use true
  })
);

// Middleware para processar corpos das requisições
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas de autenticação
app.use("/", authRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});