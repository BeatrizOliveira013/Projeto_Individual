const memoriaModel = require("../models/memoriaModel");

async function salvarTempo(req, res) {
    try {
        const { usuarioId, tempo } = req.body;

        if (!usuarioId || tempo === undefined) {
            return res.status(400).json({ error: "Dados inválidos. Envie usuarioId e tempo." });
        }

        await memoriaModel.salvarTempo(usuarioId, tempo);
        res.status(201).json({ message: "Tempo salvo com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar tempo no jogo da memória:", error);
        res.status(500).json({ error: "Erro interno ao salvar o tempo no jogo da memória." });
    }
}

async function obterTopTempos(req, res) {
    try {
        const topTempos = await memoriaModel.obterTopTempos();
        res.status(200).json({ memoria: { topTempos } });
    } catch (error) {
        console.error("Erro ao obter os 5 melhores tempos do jogo da memória:", error);
        res.status(500).json({ error: "Erro ao obter os 5 melhores tempos do jogo da memória." });
    }
}

async function salvarResultadoMemoria(req, res) {
    try {
        const { usuario_id, tempo } = req.body;

        if (!usuario_id || !tempo) {
            return res.status(400).json({ message: "Dados insuficientes para salvar resultado do jogo da memória." });
        }

        await memoriaModel.salvarTempo(usuario_id, tempo);
        return res.status(201).json({ message: "Resultado do jogo da memória salvo com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar o resultado do jogo da memória:", error);
        return res.status(500).json({ message: "Erro ao salvar o resultado do jogo da memória." });
    }
}

async function obterResultadosMemoria(req, res) {
    try {
        const { usuario_id } = req.params;

        if (!usuario_id) {
            return res.status(400).json({ message: "ID do usuário não fornecido." });
        }

        const resultados = await memoriaModel.obterResultadosMemoria(usuario_id);
        return res.status(200).json(resultados);
    } catch (error) {
        console.error(`Erro ao obter os resultados do jogo da memória para o usuário ${usuario_id}:`, error);
        return res.status(500).json({ message: "Erro ao obter os resultados do jogo da memória." });
    }
}

module.exports = {
    salvarTempo,
    obterTopTempos,
    salvarResultadoMemoria,
    obterResultadosMemoria
};
