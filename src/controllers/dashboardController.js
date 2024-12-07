const dashboardModel = require("../models/dashboardModel");

async function obterEstatisticas(req, res) {
    try {
        const [estatisticasQuiz, participantes, temposMemoria] = await Promise.all([
            dashboardModel.obterEstatisticasQuiz(),
            dashboardModel.obterParticipantes(),
            dashboardModel.obterTemposMemoria(),
        ]);

        res.status(200).json({
            quiz: estatisticasQuiz,
            participantes: participantes[0]?.total_participantes || 0,
            memoria: temposMemoria,
        });
    } catch (erro) {
        console.error("Erro ao obter estatísticas da dashboard:", erro);
        res.status(500).json({ message: "Erro ao obter estatísticas." });
    }
}

async function obterDashboard(req, res) {
    try {
        const { usuario_id } = req.params;

        if (!usuario_id) {
            return res.status(400).json({ message: "ID do usuário não fornecido." });
        }

        const dados = await dashboardModel.obterDadosDoUsuario(usuario_id);

        if (!dados || dados.length === 0) {
            return res.status(404).json({ message: "Nenhum dado encontrado para o usuário." });
        }

        res.status(200).json(dados);
    } catch (erro) {
        console.error(`Erro ao obter dashboard para o usuário ${req.params.usuario_id}:`, erro);
        res.status(500).json({ message: "Erro ao obter dados do dashboard." });
    }
}

module.exports = {
    obterEstatisticas,
    obterDashboard
};
