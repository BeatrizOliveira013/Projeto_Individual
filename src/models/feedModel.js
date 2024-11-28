const database = require("../database/config");

function listar() {
    const instrucao = `
        SELECT 
            feed_posts.id AS idAviso, 
            feed_posts.titulo, 
            feed_posts.descricao, 
            feed_posts.data_postagem, 
            usuario.nome AS autor
        FROM feed_posts
        JOIN usuario ON feed_posts.usuario_id = usuario.id
        ORDER BY feed_posts.data_postagem DESC;
    `;
    return database.executar(instrucao);
}

function listarPorUsuario(idUsuario) {
    const instrucao = `
        SELECT 
            feed_posts.id AS idAviso, 
            feed_posts.titulo, 
            feed_posts.descricao, 
            feed_posts.data_postagem
        FROM feed_posts
        WHERE usuario_id = ${idUsuario}
        ORDER BY feed_posts.data_postagem DESC;
    `;
    return database.executar(instrucao);
}

function publicar(titulo, descricao, idUsuario) {
    const instrucao = `
        INSERT INTO feed_posts (titulo, descricao, usuario_id) 
        VALUES ('${titulo}', '${descricao}', ${idUsuario});
    `;
    return database.executar(instrucao);
}

function editar(titulo, descricao, idAviso) {
    const instrucao = `
        UPDATE feed_posts 
        SET 
            titulo = '${titulo}', 
            descricao = '${descricao}' 
        WHERE id = ${idAviso};
    `;
    return database.executar(instrucao);
}


function deletar(idAviso) {
    const instrucao = `
        DELETE FROM feed_posts 
        WHERE id = ${idAviso};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    listarPorUsuario,
    publicar,
    editar,
    deletar
};
