const database = require("../database/config");

function autenticar(email, senha) {
    const query = `
        SELECT id, nome, email, imagem_perfil 
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(query);
}

function cadastrar(nome, email, senha) {
    const query = `
        INSERT INTO usuario (nome, email, senha) 
        VALUES ('${nome}', '${email}', '${senha}');
    `;
    return database.executar(query);
}

function cadastrarComImagem(nome, email, senha, imagem_perfil) {
    const query = `
        INSERT INTO usuario (nome, email, senha, imagem_perfil) 
        VALUES ('${nome}', '${email}', '${senha}', '${imagem_perfil}');
    `;
    return database.executar(query);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarComImagem
};
