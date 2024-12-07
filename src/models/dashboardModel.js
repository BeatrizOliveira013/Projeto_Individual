const database = require("../database/config");

async function obterEstatisticasQuiz() {
    try {
        const query = `
            SELECT 
                perfil, 
                COUNT(*) AS total 
            FROM quiz_resultados 
            GROUP BY perfil;
        `;
        return await database.executar(query);
    } catch (error) {
        console.error("Erro ao obter as estatísticas do quiz:", error);
        throw error;
    }
}

async function obterParticipantes() {
    try {
        const query = `
            SELECT COUNT(DISTINCT usuario_id) AS total_participantes 
            FROM quiz_resultados;
        `;
        return await database.executar(query);
    } catch (error) {
        console.error("Erro ao obter a quantidade de participantes:", error);
        throw error;
    }
}

async function obterTemposMemoria() {
    try {
        const query = `
            SELECT usuario_id, MIN(tempo) AS tempo_minimo 
            FROM memoria_resultados 
            GROUP BY usuario_id;
        `;
        return await database.executar(query);
    } catch (error) {
        console.error("Erro ao obter os tempos de memória:", error);
        throw error;
    }
}

async function obterDadosDoUsuario(usuario_id) {
    try {
        const query = `
            SELECT 
                usuario_id, 
                COUNT(DISTINCT quiz_resultados.id) AS total_quizzes,
                COUNT(DISTINCT memoria_resultados.id) AS total_memoria_jogos,
                MIN(memoria_resultados.tempo) AS melhor_tempo_memoria
            FROM usuario
            LEFT JOIN quiz_resultados ON usuario.id = quiz_resultados.usuario_id
            LEFT JOIN memoria_resultados ON usuario.id = memoria_resultados.usuario_id
            WHERE usuario.id = ?;
        `;
        return await database.executar(query, [usuario_id]);
    } catch (error) {
        console.error(`Erro ao obter os dados do dashboard para o usuário ${usuario_id}:`, error);
        throw error;
    }
}

module.exports = {
    obterEstatisticasQuiz,
    obterParticipantes,
    obterTemposMemoria,
    obterDadosDoUsuario
};
