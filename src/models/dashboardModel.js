const database = require("../database/config");

function obterEstatisticasQuiz() {
    const query = `
        SELECT perfil, COUNT(*) AS total 
        FROM quiz_resultados 
        GROUP BY perfil;
    `;
    return database.executar(query);
}

function obterParticipantes() {
    const query = `
        SELECT COUNT(DISTINCT usuario_id) AS total_participantes 
        FROM quiz_resultados;
    `;
    return database.executar(query);
}

function obterTemposMemoria() {
    const query = `
        SELECT usuario_id, MIN(tempo) AS tempo_minimo 
        FROM memoria_resultados 
        GROUP BY usuario_id;
    `;
    return database.executar(query);
}

function obterDadosDoUsuario(usuario_id) {
    const query = `
        SELECT 
            q.perfil, 
            DATE_FORMAT(q.data_quiz, '%d/%m/%Y %H:%i') AS data_quiz, 
            m.tempo, 
            DATE_FORMAT(m.data_jogo, '%d/%m/%Y %H:%i') AS data_jogo 
        FROM 
            quiz_resultados q 
        LEFT JOIN 
            memoria_resultados m ON q.usuario_id = m.usuario_id 
        WHERE 
            q.usuario_id = '${usuario_id}';
    `;
    return database.executar(query);
}

module.exports = {
    obterEstatisticasQuiz,
    obterParticipantes,
    obterTemposMemoria,
    obterDadosDoUsuario
};
