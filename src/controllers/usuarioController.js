var usuarioModel = require("../models/usuarioModel");
// função pra autenticar
function autenticar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;  
    var senha = req.body.senhaServer;
    

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }else if (email == undefined) {
        res.status(400).send("Seu email está indefinida!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome, 
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
    // Criar variáveis para recuperar os valores enviados no cadastro e login
  
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nome = req.body.nomeServer;
 

    // Validações dos campos obrigatórios
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } 
    
     else {
        // Chama a função cadastrar no modelo com os valores capturados
        usuarioModel.cadastrar(nome, email, senha)
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

