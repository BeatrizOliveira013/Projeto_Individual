const database = require("../database/config");

// Salvar pontuação
async function salvarPontuacao(usuarioId, pontuacao) {
    const sql = `
        INSERT INTO cruzadinha_resultados (usuario_id, pontuacao, numero_erros)
        VALUES (?, ?, ?)
    `;
    const params = [usuarioId, pontuacao, 0];
    return await database.executar(sql, params);
}

// Salvar erro
async function salvarErro(usuarioId, perguntaId) {
    const sql = `
        INSERT INTO cruzadinha_erros (usuario_id, pergunta_id)
        VALUES (?, ?)
    `;
    const params = [usuarioId, perguntaId];
    return await database.executar(sql, params);
}


// Obter top jogadores
function obterTopJogadores() {
    const query = `
        SELECT usuario_id, SUM(pontuacao) AS total_pontuacao
        FROM cruzadinha_resultados
        GROUP BY usuario_id
        ORDER BY total_pontuacao DESC
        LIMIT 5
    `;
    return database.executar(query);
}

// Obter perguntas mais erradas
function obterPerguntasMaisErradas() {
    const query = `
        SELECT pergunta_id, COUNT(*) AS erros
        FROM cruzadinha_erros
        GROUP BY pergunta_id
        ORDER BY erros DESC
        LIMIT 5
    `;
    return database.executar(query);
}

module.exports = {
    salvarPontuacao,
    salvarErro,
    obterTopJogadores,
    obterPerguntasMaisErradas,
};
