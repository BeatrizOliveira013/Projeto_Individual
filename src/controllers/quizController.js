const usuarioModel = require("../models/usuarioModel");

async function salvarResultadoQuiz(req, res) {
    try {
        const { usuario_id, perfil } = req.body;

        if (!usuario_id || !perfil) {
            return res.status(400).json({ message: "Dados insuficientes para salvar resultado do quiz." });
        }

        await usuarioModel.salvarResultadoQuiz(usuario_id, perfil);
        return res.status(201).json({ message: "Resultado do quiz salvo com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar resultado do quiz:", error);
        return res.status(500).json({ message: "Erro ao salvar resultado do quiz." });
    }
}

async function obterResultadosQuiz(req, res) {
    try {
        const { usuario_id } = req.params;

        if (!usuario_id) {
            return res.status(400).json({ message: "ID do usuário não fornecido." });
        }

        const resultados = await usuarioModel.obterResultadosQuiz(usuario_id);
        return res.status(200).json(resultados);
    } catch (error) {
        console.error("Erro ao obter resultados do quiz:", error);
        return res.status(500).json({ message: "Erro ao obter resultados do quiz." });
    }
}

module.exports = {
    salvarResultadoQuiz,
    obterResultadosQuiz
};
