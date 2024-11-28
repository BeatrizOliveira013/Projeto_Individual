const express = require("express");
const router = express.Router();
const avisoController = require("../controllers/avisoController");

// Rota para listar todas as postagens
router.get("/listar", (req, res) => {
    avisoController.listar(req, res);
});

// Rota para listar postagens de um usuário específico
router.get("/listar/:idUsuario", (req, res) => {
    avisoController.listarPorUsuario(req, res);
});

// Rota para publicar uma nova postagem
router.post("/publicar/:idUsuario", (req, res) => {
    avisoController.publicar(req, res);
});

// Rota para editar uma postagem existente
router.put("/editar/:idAviso", (req, res) => {
    avisoController.editar(req, res);
});

// Rota para deletar uma postagem
router.delete("/deletar/:idAviso", (req, res) => {
    avisoController.deletar(req, res);
});

module.exports = router;
