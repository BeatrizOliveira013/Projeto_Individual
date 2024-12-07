const express = require("express"); // Importa o express
const router = express.Router(); // Inicializa o router
const usuarioController = require("../controllers/usuarioController"); // Importa o controller do usuário

// ✅ Rota para salvar o resultado do quiz
router.post("/quiz-resultados", usuarioController.salvarResultadoQuiz);

// ✅ Rota para obter os resultados do quiz de um usuário
router.get("/quiz-resultados/:usuario_id", usuarioController.obterResultadosQuiz);

// ✅ Exportação do router para ser usado no arquivo app.js
module.exports = router;
