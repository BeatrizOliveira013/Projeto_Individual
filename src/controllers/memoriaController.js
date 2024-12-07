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



const usuarioModel = require("../models/usuarioModel");

async function salvarResultadoMemoria(req, res) {
    try {
        const { usuario_id, tempo } = req.body;

        if (!usuario_id || !tempo) {
            return res.status(400).json({ message: "Dados insuficientes para salvar resultado do jogo da memória." });
        }

        await usuarioModel.salvarResultadoMemoria(usuario_id, tempo);
        return res.status(201).json({ message: "Resultado do jogo da memória salvo com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar resultado do jogo da memória:", error);
        return res.status(500).json({ message: "Erro ao salvar resultado do jogo da memória." });
    }
}

async function obterResultadosMemoria(req, res) {
    try {
        const { usuario_id } = req.params;

        if (!usuario_id) {
            return res.status(400).json({ message: "ID do usuário não fornecido." });
        }

        const resultados = await usuarioModel.obterResultadosMemoria(usuario_id);
        return res.status(200).json(resultados);
    } catch (error) {
        console.error("Erro ao obter resultados do jogo da memória:", error);
        return res.status(500).json({ message: "Erro ao obter resultados do jogo da memória." });
    }
}

module.exports = {
    salvarResultadoMemoria,
    obterResultadosMemoria
};
