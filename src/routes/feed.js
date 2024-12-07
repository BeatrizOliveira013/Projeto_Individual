const express = require("express");
const router = express.Router();

// Importando o feedController
const feedController = require("../controllers/feedController");

// Rota para listar todas as postagens
router.get("/listar", (req, res) => {
    feedController.listar(req, res);
});

// Rota para listar postagens de um usuário específico
router.get("/listar/:idUsuario", (req, res) => {
    feedController.listarPorUsuario(req, res);
});

// Rota para publicar uma nova postagem
router.post("/publicar/:idUsuario", (req, res) => {
    feedController.publicar(req, res);
});

// Rota para editar uma postagem existente
router.put("/editar/:idPostagem", (req, res) => {
    feedController.editar(req, res);
});

// Rota para deletar uma postagem
router.delete("/deletar/:idPostagem", (req, res) => {
    feedController.deletar(req, res);
});

module.exports = router;
