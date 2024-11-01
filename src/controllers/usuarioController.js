/*var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;  
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].representante, 
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }).catch(function (erro) {
                console.log("Erro na autenticação:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function cadastrar(req, res) {
    // Crie variáveis para recuperar os valores enviados no cadastro
    var razaoSocial = req.body.razaoSocialServer;
    var nomeFantasia = req.body.nomeFantasiaServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var representante = req.body.representanteServer;
    var cnpj = req.body.cnpjServer;

    // Validações dos campos obrigatórios
    if (razaoSocial == undefined) {
        res.status(400).send("A razão social está undefined!");
    } else if (nomeFantasia == undefined) {
        res.status(400).send("O nome fantasia está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (representante == undefined) {
        res.status(400).send("O representante legal está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("O CNPJ está undefined!");
    } else {
        // Chama a função cadastrar no modelo com os valores capturados
        usuarioModel.cadastrar(razaoSocial, nomeFantasia, email, senha, representante, cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
};
*/

var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;  
    var senha = req.body.senhaServer;

    if (!email) {
        res.status(400).send("Seu email está undefined!");
    } else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }).catch(function (erro) {
                console.log("Erro na autenticação:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var { razaoSocialServer: razaoSocial, nomeFantasiaServer: nomeFantasia, emailServer: email, senhaServer: senha, representanteServer: representante, cnpjServer: cnpj } = req.body;

    if (!razaoSocial || !nomeFantasia || !email || !senha || !representante || !cnpj) {
        res.status(400).send("Todos os campos obrigatórios devem ser preenchidos!");
    } else {
        usuarioModel.cadastrar(razaoSocial, nomeFantasia, email, senha, representante, cnpj)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log("Erro no cadastro:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
};
