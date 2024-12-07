const express = require("express");
const router = express.Router();
const memoriaController = require("../controllers/memoriaController");

// Rota para salvar tempo do jogador
router.post("/salvar", memoriaController.salvarTempo);

// Rota para obter os 5 melhores tempos
router.get("/top", memoriaController.obterTopTempos);

module.exports = router;
