const cruzadinhaModel = require("../models/cruzadinhaModel");

async function salvarPontuacao(req, res) {
    const { usuarioId, pontuacao, erros } = req.body;

    if (!usuarioId || pontuacao === undefined || !Array.isArray(erros)) {
        return res.status(400).json({ error: "Dados inválidos. Envie usuarioId, pontuacao e erros." });
    }

    try {
        // Salvar a pontuação
        await cruzadinhaModel.salvarPontuacao(usuarioId, pontuacao);

        // Salvar os erros
        for (const perguntaId of erros) {
            await cruzadinhaModel.salvarErro(usuarioId, perguntaId); // Usa o ID da pergunta
        }

        res.status(201).json({ message: "Pontuação e erros salvos com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
        res.status(500).json({ error: "Erro interno ao salvar pontuação." });
    }
}


async function obterEstatisticas(req, res) {
    try {
        const topJogadores = await cruzadinhaModel.obterTopJogadores();
        const perguntasErradas = await cruzadinhaModel.obterPerguntasMaisErradas();

        res.status(200).json({ cruzadinha: { topJogadores, perguntasErradas } });
    } catch (error) {
        console.error("Erro ao obter estatísticas:", error);
        res.status(500).json({ erro: "Erro ao obter estatísticas da cruzadinha." });
    }
}

module.exports = { salvarPontuacao, obterEstatisticas };
