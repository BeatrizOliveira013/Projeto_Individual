const avisoModel = require("../models/avisoModel");

function listar(req, res) {
    avisoModel
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

function listarPorUsuario(req, res) {
    const idUsuario = req.params.idUsuario;

    avisoModel
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

function publicar(req, res) {
    const { titulo, descricao } = req.body;
    const idUsuario = req.params.idUsuario;

    if (!titulo || !descricao || !idUsuario) {
        res.status(400).json({ erro: "Dados incompletos para publicação." });
        return;
    }

    avisoModel
        .publicar(titulo, descricao, idUsuario)
        .then((resultado) => {
            res.status(201).json({ mensagem: "Postagem publicada com sucesso!", resultado });
        })
        .catch((erro) => {
            console.error("Erro ao publicar postagem:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro ao publicar postagem." });
        });
}

function editar(req, res) {
    const idAviso = req.params.idAviso;
    const { descricao } = req.body;

    if (!descricao || !idAviso) {
        res.status(400).json({ erro: "Dados incompletos para edição." });
        return;
    }

    avisoModel
        .editar(descricao, idAviso)
        .then((resultado) => {
            res.status(200).json({ mensagem: "Postagem editada com sucesso!", resultado });
        })
        .catch((erro) => {
            console.error("Erro ao editar postagem:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro ao editar postagem." });
        });
}
function editar(req, res) {
    const idAviso = req.params.idAviso;
    const { titulo, descricao } = req.body;

    if (!titulo || !descricao || !idAviso) {
        res.status(400).json({ erro: "Dados incompletos para edição." });
        return;
    }

    feedModel
        .editar(titulo, descricao, idAviso)
        .then((resultado) => {
            res.status(200).json({ mensagem: "Postagem editada com sucesso!", resultado });
        })
        .catch((erro) => {
            console.error("Erro ao editar postagem:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro ao editar postagem." });
        });
}



function deletar(req, res) {
    const idAviso = req.params.idAviso;

    if (!idAviso) {
        res.status(400).json({ erro: "ID da postagem não fornecido para exclusão." });
        return;
    }

    avisoModel
        .deletar(idAviso)
        .then((resultado) => {
            res.status(200).json({ mensagem: "Postagem deletada com sucesso!", resultado });
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
