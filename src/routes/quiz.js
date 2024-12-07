const express = require("express");
const router = express.Router();


router.post("/quiz-resultados", usuarioController.salvarResultadoQuiz);
router.get("/quiz-resultados/:usuario_id", usuarioController.obterResultadosQuiz);



router.get("/quiz-resultados/:usuario_id", usuarioController.obterResultadosQuiz);


// Resultados do Quiz
router.post("/quiz-resultados", (req, res, next) => {
    console.log("POST /quiz-resultados atingido");
    next();
}, usuarioController.salvarResultadoQuiz);

