const feedModel = require("../models/feedModel");

// Listar todas as postagens
function listar(req, res) {
    feedModel
        .listar()
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma postagem encontrada!");
            }
        })
        .catch((erro) => {
            console.error("Erro ao listar postagens:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro ao listar postagens." });
        });
}

// Listar postagens de um usuário específico
function listarPorUsuario(req, res) {
    const idUsuario = req.params.idUsuario;

    if (!idUsuario) {
        res.status(400).json({ erro: "ID do usuário não fornecido." });
        return;
    }

    feedModel
        .listarPorUsuario(idUsuario)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma postagem encontrada para este usuário!");
            }
        })
        .catch((erro) => {
            console.error("Erro ao listar postagens por usuário:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro ao listar postagens por usuário." });
        });
}

// Publicar uma nova postagem
function publicar(req, res) {
    const { texto } = req.body;
    const idUsuario = req.params.idUsuario;

    if (!texto || !idUsuario) {
        res.status(400).json({ erro: "Dados incompletos para publicação." });
        return;
    }

    feedModel
        .publicar(texto, idUsuario)
        .then(() => {
            res.status(201).json({ mensagem: "Postagem publicada com sucesso!" });
        })
        .catch((erro) => {
            console.error("Erro ao publicar postagem:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro ao publicar postagem." });
        });
}

// Editar uma postagem existente
function editar(req, res) {
    const idPostagem = req.params.idPostagem;
    const { texto } = req.body;

    if (!texto || !idPostagem) {
        res.status(400).json({ erro: "Dados incompletos para edição." });
        return;
    }

    feedModel
        .editar(texto, idPostagem)
        .then(() => {
            res.status(200).json({ mensagem: "Postagem editada com sucesso!" });
        })
        .catch((erro) => {
            console.error("Erro ao editar postagem:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro ao editar postagem." });
        });
}

// Deletar uma postagem
function deletar(req, res) {
    const idPostagem = req.params.idPostagem;

    if (!idPostagem) {
        res.status(400).json({ erro: "ID da postagem não fornecido para exclusão." });
        return;
    }

    feedModel
        .deletar(idPostagem)
        .then(() => {
            res.status(200).json({ mensagem: "Postagem deletada com sucesso!" });
        })
        .catch((erro) => {
            console.error("Erro ao deletar postagem:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro ao deletar postagem." });
        });
}

module.exports = {
    listar,
    listarPorUsuario,
    publicar,
    editar,
    deletar,
};
