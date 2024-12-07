const database = require("../database/config");

function salvarResultadoQuiz(usuario_id, perfil) {
    const query = `
        INSERT INTO quiz_resultados (usuario_id, perfil, data_quiz) 
        VALUES ('${usuario_id}', '${perfil}', NOW());
    `;
    return database.executar(query);
}

function obterResultadosQuiz(usuario_id) {
    const query = `
        SELECT perfil, DATE_FORMAT(data_quiz, '%d/%m/%Y %H:%i') AS data 
        FROM quiz_resultados 
        WHERE usuario_id = '${usuario_id}';
    `;
    return database.executar(query);
}

module.exports = {
    salvarResultadoQuiz,
    obterResultadosQuiz
};
