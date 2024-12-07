const database = require("../database/config");

function autenticar(email, senha) {
    const query = `
        SELECT id, nome, email 
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

module.exports = {
    autenticar,
    cadastrar
};
