const database = require("../database/config");

// Salvar resultado do quiz no banco de dados
async function salvarResultadoQuiz(usuario_id, perfil) {
    try {
        const query = `
            INSERT INTO quiz_resultados (usuario_id, perfil, data_quiz)
            VALUES (?, ?, NOW());
        `;
        return await database.executar(query, [usuario_id, perfil]);
    } catch (error) {
        console.error(`Erro ao salvar o resultado do quiz para o usuário (ID: ${usuario_id}):`, error);
        throw error;
    }
}

// Obter resultados do quiz de um usuário específico
async function obterResultadosQuiz(usuario_id) {
    try {
        const query = `
            SELECT 
                perfil, 
                DATE_FORMAT(data_quiz, '%d/%m/%Y %H:%i') AS data 
            FROM quiz_resultados 
            WHERE usuario_id = ?;
        `;
        return await database.executar(query, [usuario_id]);
    } catch (error) {
        console.error(`Erro ao obter os resultados do quiz para o usuário (ID: ${usuario_id}):`, error);
        throw error;
    }
}

module.exports = {
    salvarResultadoQuiz,
    obterResultadosQuiz
};
