const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Rota para obter as estatísticas gerais do dashboard
router.get("/", dashboardController.obterEstatisticas);

// Rota para obter as informações do usuário no dashboard
router.get("/usuario/:usuario_id", dashboardController.obterDashboard);

module.exports = router;
