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
        res.status(500).send("Erro ao obter estatísticas.");
    }
}

module.exports = {
    obterEstatisticas,
};
