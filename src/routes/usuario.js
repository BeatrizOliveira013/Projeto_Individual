const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", usuarioController.cadastrar);
router.post("/autenticar", usuarioController.autenticar);

module.exports = router;
