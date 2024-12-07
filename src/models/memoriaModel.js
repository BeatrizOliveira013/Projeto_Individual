const database = require("../database/config");

// Salvar o tempo do jogador no banco de dados
async function salvarTempo(usuarioId, tempo) {
    const query = `
        INSERT INTO memoria_resultados (usuario_id, tempo)
        VALUES (?, ?)
    `;
    return await database.executar(query, [usuarioId, tempo]);
}

// Obter os 5 melhores tempos
async function obterTopTempos() {
    const query = `
        SELECT 
            usuario_id, 
            MIN(tempo) AS tempo_recorde 
        FROM memoria_resultados 
        GROUP BY usuario_id 
        ORDER BY tempo_recorde ASC 
        LIMIT 5
    `;
    return await database.executar(query);
}

module.exports = {
    salvarTempo,
    obterTopTempos,
};
