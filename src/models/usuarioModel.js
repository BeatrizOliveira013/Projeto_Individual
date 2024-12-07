const database = require("../database/config");

// ✅ Função para autenticar o usuário no banco de dados
function autenticar(email, senha) {
    const query = `
        SELECT id, nome, email 
        FROM usuario 
        WHERE email = ? AND senha = ?;
    `;
    console.log("Executando query de autenticação de usuário...");
    return database.executar(query, [email, senha]);
}

// ✅ Função para cadastrar um novo usuário no banco de dados
function cadastrar(nome, email, senha) {
    const query = `
        INSERT INTO usuario (nome, email, senha) 
        VALUES (?, ?, ?);
    `;
    console.log("Executando query de cadastro de usuário...");
    return database.executar(query, [nome, email, senha]);
}

// ✅ Função para salvar o resultado do quiz
function salvarResultadoQuiz(usuario_id, perfil) {
    console.log("Acessando o model para salvar resultado do quiz:", usuario_id, perfil);

    const query = `
        INSERT INTO quiz_resultados (usuario_id, perfil, data_quiz) 
        VALUES (?, ?, NOW());
    `;

    console.log("Executando SQL para salvar resultado do quiz: \n" + query);
    return database.executar(query, [usuario_id, perfil]);
}

// ✅ Função para salvar o resultado do jogo da memória
function salvarResultadoMemoria(usuario_id, tempo) {
    console.log("Acessando o model para salvar resultado do jogo da memória:", usuario_id, tempo);

    const query = `
        INSERT INTO memoria_resultados (usuario_id, tempo, data_jogo) 
        VALUES (?, ?, NOW());
    `;

    console.log("Executando SQL para salvar resultado do jogo da memória: \n" + query);
    return database.executar(query, [usuario_id, tempo]);
}

// ✅ Função para obter os resultados do quiz de um usuário
function obterResultadosQuiz(usuario_id) {
    console.log("Acessando o model para obter resultados do quiz do usuário:", usuario_id);

    const query = `
        SELECT perfil, DATE_FORMAT(data_quiz, '%d/%m/%Y %H:%i') AS data 
        FROM quiz_resultados 
        WHERE usuario_id = ?;
    `;

    console.log("Executando SQL para obter resultados do quiz: \n" + query);
    return database.executar(query, [usuario_id]);
}

// ✅ Função para obter os resultados do jogo da memória de um usuário
function obterResultadosMemoria(usuario_id) {
    console.log("Acessando o model para obter resultados do jogo da memória do usuário:", usuario_id);

    const query = `
        SELECT tempo, DATE_FORMAT(data_jogo, '%d/%m/%Y %H:%i') AS data 
        FROM memoria_resultados 
        WHERE usuario_id = ?;
    `;

    console.log("Executando SQL para obter resultados do jogo da memória: \n" + query);
    return database.executar(query, [usuario_id]);
}

// ✅ Exportação de todas as funções do model
module.exports = {
    autenticar,
    cadastrar,
    salvarResultadoQuiz,
    salvarResultadoMemoria,
    obterResultadosQuiz,
    obterResultadosMemoria
};
