
/*var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    
   
    var instrucaoSql = `
        SELECT id, representantelegal AS nome, email FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, nomeFantasia, email, senha, representante, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocial, nomeFantasia, email, senha, representante, cnpj);


    var instrucaoSql = `
        INSERT INTO empresa (razaosocial, nomefantasia, email, senha, representantelegal, cnpj) 
        VALUES ('${razaoSocial}', '${nomeFantasia}', '${email}', '${senha}', '${representante}', '${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
