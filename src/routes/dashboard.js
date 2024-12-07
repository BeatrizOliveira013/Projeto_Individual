const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Rota para obter estatísticas gerais da dashboard
router.get("/", dashboardController.obterEstatisticas);

// Rota para obter o dashboard do usuário com base no seu ID
router.get("/dados/:usuario_id", dashboardController.obterDashboard);

module.exports = router;
