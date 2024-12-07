const usuarioModel = require("../models/usuarioModel");

// Salvar resultado do quiz
async function salvarResultadoQuiz(req, res) {
    try {
        const { usuario_id, perfil } = req.body;

        if (!usuario_id || !perfil) {
            return res.status(400).json({ message: "Dados insuficientes para salvar o resultado do quiz." });
        }

        console.log(`POST /quiz-resultados - Usuario ID: ${usuario_id}, Perfil: ${perfil}`);

        await usuarioModel.salvarResultadoQuiz(usuario_id, perfil);
        return res.status(201).json({ message: "Resultado do quiz salvo com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar o resultado do quiz:", error);
        return res.status(500).json({ message: "Erro ao salvar o resultado do quiz." });
    }
}

// Obter resultados do quiz
async function obterResultadosQuiz(req, res) {
    try {
        const { usuario_id } = req.params;

        if (!usuario_id) {
            return res.status(400).json({ message: "ID do usuário não fornecido." });
        }

        const resultados = await usuarioModel.obterResultadosQuiz(usuario_id);
        return res.status(200).json(resultados);
    } catch (error) {
        console.error(`Erro ao obter os resultados do quiz para o usuário (ID: ${usuario_id}):`, error);
        return res.status(500).json({ message: "Erro ao obter os resultados do quiz." });
    }
}

module.exports = {
    salvarResultadoQuiz,
    obterResultadosQuiz
};
