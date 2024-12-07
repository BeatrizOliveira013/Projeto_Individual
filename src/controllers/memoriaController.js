const memoriaModel = require("../models/memoriaModel");

async function salvarTempo(req, res) {
    const { usuarioId, tempo } = req.body;

    if (!usuarioId || tempo === undefined) {
        return res.status(400).json({ error: "Dados inválidos. Envie usuarioId e tempo." });
    }

    try {
        await memoriaModel.salvarTempo(usuarioId, tempo);
        res.status(201).json({ message: "Tempo salvo com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar tempo:", error);
        res.status(500).json({ error: "Erro interno ao salvar tempo." });
    }
}

async function obterTopTempos(req, res) {
    try {
        const topTempos = await memoriaModel.obterTopTempos();
        res.status(200).json({ memoria: { topTempos } });
    } catch (error) {
        console.error("Erro ao obter tempos:", error);
        res.status(500).json({ error: "Erro ao obter os tempos do jogo da memória." });
    }
}

module.exports = {
    salvarTempo,
    obterTopTempos,
};
