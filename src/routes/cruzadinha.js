const express = require("express");
const router = express.Router();
const cruzadinhaController = require("../controllers/cruzadinhaController");

// Rota para salvar os resultados da cruzadinha
if (typeof cruzadinhaController.salvarPontuacao !== "function") {
    throw new Error("cruzadinhaController.salvarPontuacao não está definido");
}
router.post("/pontuacao", cruzadinhaController.salvarPontuacao);

// Rota para obter estatísticas da cruzadinha
if (typeof cruzadinhaController.obterEstatisticas !== "function") {
    throw new Error("cruzadinhaController.obterEstatisticas não está definido");
}
router.get("/estatisticas", cruzadinhaController.obterEstatisticas);

module.exports = router;
