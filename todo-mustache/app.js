const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const tarefasRoutes = require("./routes/tarefasRoutes");

const app = express();
const PORT = 3000;

// Configuração do Mustache
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Servir arquivos estáticos

// Rotas
app.use("/", tarefasRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
