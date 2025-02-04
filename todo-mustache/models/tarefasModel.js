let tarefas = [
  { id: 1, titulo: "Estudar Node.js", concluida: false },
  { id: 2, titulo: "Fazer exercícios de Express", concluida: true },
  { id: 3, titulo: "Implementar API REST", concluida: false },
];

function getTarefas() {
  return tarefas;
}

function adicionarTarefa(titulo) {
  const novaTarefa = { id: tarefas.length + 1, titulo, concluida: false };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

function removerTarefa(id) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index !== -1) {
    tarefas.splice(index, 1);
    return true;
  }
  return false;
}

function alternarConclusao(id) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    return tarefa;
  }
  return null;
}

module.exports = { getTarefas, adicionarTarefa, removerTarefa, alternarConclusao };