const database = require("../database/config");

// 🕒 Função para salvar o tempo do jogador no banco de dados
async function salvarTempo(usuarioId, tempo) {
    try {
        const query = `
            INSERT INTO memoria_resultados (usuario_id, tempo, data_jogo)
            VALUES (?, ?, NOW());
        `;
        const resultado = await database.executar(query, [usuarioId, tempo]);
        return resultado;
    } catch (error) {
        console.error(`Erro ao salvar o tempo do jogador (ID: ${usuarioId}):`, error);
        throw error; // Propaga o erro para o controller
    }
}

// 🏆 Função para obter os 5 melhores tempos de todos os jogadores
async function obterTopTempos() {
    try {
        const query = `
            SELECT 
                usuario_id, 
                MIN(tempo) AS tempo_recorde 
            FROM memoria_resultados 
            GROUP BY usuario_id 
            ORDER BY tempo_recorde ASC 
            LIMIT 5;
        `;
        const resultados = await database.executar(query);
        return resultados;
    } catch (error) {
        console.error("Erro ao obter os 5 melhores tempos do jogo da memória:", error);
        throw error; // Propaga o erro para o controller
    }
}

// 📄 Função para obter os tempos de um jogador específico
async function obterResultadosMemoria(usuarioId) {
    try {
        const query = `
            SELECT 
                tempo, 
                DATE_FORMAT(data_jogo, '%d/%m/%Y %H:%i') AS data 
            FROM memoria_resultados 
            WHERE usuario_id = ?;
        `;
        const resultados = await database.executar(query, [usuarioId]);
        return resultados;
    } catch (error) {
        console.error(`Erro ao obter os tempos de memória para o jogador (ID: ${usuarioId}):`, error);
        throw error; // Propaga o erro para o controller
    }
}

module.exports = {
    salvarTempo,
    obterTopTempos,
    obterResultadosMemoria
};
