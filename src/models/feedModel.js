const database = require("../database/config");

// Listar todas as postagens
function listar() {
    const instrucao = `
        SELECT 
            feed_posts.id AS idPostagem, 
            feed_posts.texto AS descricao, 
            feed_posts.data_postagem, 
            usuario.nome AS autor
        FROM feed_posts
        JOIN usuario ON feed_posts.usuario_id = usuario.id
        ORDER BY feed_posts.data_postagem DESC;
    `;
    return database.executar(instrucao);
}

// Listar postagens de um usuário específico
function listarPorUsuario(idUsuario) {
    const instrucao = `
        SELECT 
            feed_posts.id AS idPostagem, 
            feed_posts.texto AS descricao, 
            feed_posts.data_postagem
        FROM feed_posts
        WHERE usuario_id = ${idUsuario}
        ORDER BY feed_posts.data_postagem DESC;
    `;
    return database.executar(instrucao);
}

// Publicar uma nova postagem
function publicar(texto, idUsuario) {
    const instrucao = `
        INSERT INTO feed_posts (texto, usuario_id, data_postagem) 
        VALUES ('${texto}', ${idUsuario}, NOW());
    `;
    return database.executar(instrucao);
}

// Editar uma postagem existente
function editar(texto, idPostagem) {
    const instrucao = `
        UPDATE feed_posts 
        SET texto = '${texto}' 
        WHERE id = ${idPostagem};
    `;
    return database.executar(instrucao);
}

// Deletar uma postagem
function deletar(idPostagem) {
    const instrucao = `
        DELETE FROM feed_posts 
        WHERE id = ${idPostagem};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarPorUsuario,
    publicar,
    editar,
    deletar,
};
