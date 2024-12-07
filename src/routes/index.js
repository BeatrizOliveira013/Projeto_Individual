const express = require("express");
const router = express.Router();

// Rota principal
router.get("/", (req, res) => {
    res.status(200).json({ message: "Bem-vindo à API!" });
});

module.exports = router;
