const bcrypt = require('bcryptjs');

async function cadastrar(nome, email, senha) {
    const hash = await bcrypt.hash(senha, 10); // 10 é o fator de custo
    const query = `
        INSERT INTO usuario (nome, email, senha) 
        VALUES (?, ?, ?);
    `;
    return database.executar(query, [nome, email, hash]);
}

async function autenticar(email, senha) {
    const query = `
        SELECT id, nome, email, senha 
        FROM usuario 
        WHERE email = ?;
    `;
    const usuarios = await database.executar(query, [email]);
    if (usuarios.length === 0) {
        throw new Error("Usuário não encontrado.");
    }

    const usuario = usuarios[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        throw new Error("Senha incorreta.");
    }

    return usuario;
}
