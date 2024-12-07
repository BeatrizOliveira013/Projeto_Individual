
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController"); // Certifique-se de que o caminho está correto

// Rota para salvar o resultado do quiz
router.post("/quiz-resultados", usuarioController.salvarResultadoQuiz);

// Rota para obter os resultados do quiz para um usuário específico
router.get("/quiz-resultados/:usuario_id", usuarioController.obterResultadosQuiz);

module.exports = router;
