const database = require("../database/config");

function autenticar(email, senha) {
    const query = `
        SELECT id, nome, email 
        FROM usuario 
        WHERE email = ? AND senha = ?;
    `;
    return database.executar(query, [email, senha]);
}

function cadastrar(nome, email, senha) {
    const query = `
        INSERT INTO usuario (nome, email, senha) 
        VALUES (?, ?, ?);
    `;
    return database.executar(query, [nome, email, senha]);
}

function salvarResultadoQuiz(usuario_id, perfil) {
    console.log("Acessando o model para salvar resultado do quiz:", usuario_id, perfil);

    const query = `
        INSERT INTO quiz_resultados (usuario_id, perfil, data_quiz) 
        VALUES (?, ?, NOW());
    `;

    console.log("Executando SQL: \n" + query);
    return database.executar(query, [usuario_id, perfil]);
}

function salvarResultadoMemoria(usuario_id, tempo) {
    console.log("Acessando o model para salvar resultado do jogo da memória:", usuario_id, tempo);

    const query = `
        INSERT INTO memoria_resultados (usuario_id, tempo, data_jogo) 
        VALUES (?, ?, NOW());
    `;

    console.log("Executando SQL: \n" + query);
    return database.executar(query, [usuario_id, tempo]);
}

function obterResultadosQuiz(usuario_id) {
    console.log("Acessando o model para obter resultados do quiz:", usuario_id);

    const query = `
        SELECT perfil, DATE_FORMAT(data_quiz, '%d/%m/%Y %H:%i') AS data 
        FROM quiz_resultados 
        WHERE usuario_id = ?;
    `;

    console.log("Executando SQL: \n" + query);
    return database.executar(query, [usuario_id]);
}

function obterResultadosMemoria(usuario_id) {
    console.log("Acessando o model para obter resultados do jogo da memória:", usuario_id);

    const query = `
        SELECT tempo, DATE_FORMAT(data_jogo, '%d/%m/%Y %H:%i') AS data 
        FROM memoria_resultados 
        WHERE usuario_id = ?;
    `;

    console.log("Executando SQL: \n" + query);
    return database.executar(query, [usuario_id]);
}

module.exports = {
    autenticar,
    cadastrar,
    salvarResultadoQuiz,
    salvarResultadoMemoria,
    obterResultadosQuiz,
    obterResultadosMemoria
};
