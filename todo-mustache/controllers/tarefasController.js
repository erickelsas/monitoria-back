const Tarefas = require("../models/tarefasModel");

exports.listarTarefas = (req, res) => {
  res.render("tarefas", { tarefas: Tarefas.getTarefas() });
};

exports.adicionarTarefa = (req, res) => {
  const { titulo } = req.body;
  if (!titulo) {
    return res.status(400).json({ erro: "O campo 'titulo' é obrigatório" });
  }
  const novaTarefa = Tarefas.adicionarTarefa(titulo);
  res.status(201).json(novaTarefa);
};

exports.removerTarefa = (req, res) => {
  const id = parseInt(req.params.id);
  if (Tarefas.removerTarefa(id)) {
    return res.status(200).json({ mensagem: "Tarefa removida com sucesso" });
  }
  res.status(404).json({ erro: "Tarefa não encontrada" });
};

exports.alternarConclusao = (req, res) => {
  const id = parseInt(req.params.id);
  const tarefaAtualizada = Tarefas.alternarConclusao(id);
  if (tarefaAtualizada) {
    return res.status(200).json(tarefaAtualizada);
  }
  res.status(404).json({ erro: "Tarefa não encontrada" });
};