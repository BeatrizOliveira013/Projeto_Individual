const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Rota para obter estatísticas da dashboard
router.get("/", dashboardController.obterEstatisticas);

module.exports = router;
