const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController"); // Certifique-se de que o caminho está correto

// Rota para cadastrar um novo usuário
router.post("/cadastrar", usuarioController.cadastrar);

// Rota para autenticar o usuário (login)
router.post("/autenticar", usuarioController.autenticar);

module.exports = router;
