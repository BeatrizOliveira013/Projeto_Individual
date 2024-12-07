const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// Cadastro e login
router.post("/cadastrar", usuarioController.cadastrar);
router.post("/autenticar", usuarioController.autenticar);

// Resultados do Quiz
router.post("/quiz-resultados", (req, res, next) => {
    console.log("POST /quiz-resultados atingido");
    next();
}, usuarioController.salvarResultadoQuiz);


router.get("/quiz-resultados/:usuario_id", usuarioController.obterResultadosQuiz);

// Resultados do Jogo da Memória
router.post("/game-resultados", usuarioController.salvarResultadoMemoria);
router.get("/game-resultados/:usuario_id", usuarioController.obterResultadosMemoria);

// Dashboard
router.get("/dashboard/:usuario_id", usuarioController.obterDashboard);

module.exports = router;
