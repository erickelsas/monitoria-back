const express = require("express");
const router = express.Router();
const tarefasController = require("../controllers/tarefasController");

router.get("/", tarefasController.listarTarefas);
router.post("/tarefas", tarefasController.adicionarTarefa);
router.delete("/tarefas/:id", tarefasController.removerTarefa);
router.patch("/tarefas/:id", tarefasController.alternarConclusao);

module.exports = router;
