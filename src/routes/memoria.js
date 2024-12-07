const express = require("express");
const router = express.Router();
const memoriaController = require("../controllers/memoriaController"); // Corrigido: agora está usando memoriaController

// Rota para salvar o tempo do jogador no jogo da memória
router.post("/salvar", memoriaController.salvarResultadoMemoria);

// Rota para obter os 5 melhores tempos no jogo da memória
router.get("/top", memoriaController.obterTopTempos);

// Rota para salvar o resultado do jogo da memória
router.post("/game-resultados", memoriaController.salvarResultadoMemoria);

// Rota para obter os resultados do jogo da memória para um usuário específico
router.get("/game-resultados/:usuario_id", memoriaController.obterResultadosMemoria);

module.exports = router;
