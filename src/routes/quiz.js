const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController"); // Certifique-se de que o caminho está correto

// Rota para salvar o resultado do quiz
router.post("/quiz-resultados", quizController.salvarResultadoQuiz);

// Rota para obter os resultados do quiz de um usuário específico
router.get("/quiz-resultados/:usuario_id", quizController.obterResultadosQuiz);

module.exports = router;
