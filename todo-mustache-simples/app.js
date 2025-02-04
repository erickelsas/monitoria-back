const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Dados fictícios de tarefas (simulando um banco de dados)
let tarefas = [
  { id: 1, titulo: "Estudar Node.js", concluida: false },
  { id: 2, titulo: "Fazer exercícios de Express", concluida: true },
  { id: 3, titulo: "Implementar API REST", concluida: false },
];

// Configuração do Mustache
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Servir arquivos estáticos

// Rota para renderizar o template com os dados de tarefas
app.get("/", (req, res) => {
  res.render("tarefas", { tarefas });
});

// Rota para adicionar uma tarefa
app.post("/adicionar", (req, res) => {
  const { titulo } = req.body;
  if (!titulo) {
    return res.status(400).send("O campo 'titulo' é obrigatório");
  }
  const novaTarefa = { id: tarefas.length + 1, titulo, concluida: false };
  tarefas.push(novaTarefa);
  res.redirect("/"); // Redireciona para a página principal
});

// Rota para remover uma tarefa
app.post("/remover/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tarefas = tarefas.filter(tarefa => tarefa.id !== id); // Remove tarefa pelo ID
  res.redirect("/"); // Redireciona para a página principal
});

// Rota para marcar uma tarefa como concluída
app.post("/concluir/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida; // Alterna o estado da tarefa
  }
  res.redirect("/"); // Redireciona para a página principal
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
