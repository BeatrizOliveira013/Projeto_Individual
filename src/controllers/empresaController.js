/*var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
*/

var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj)
    .then(resultado => {
      res.status(200).json(resultado);
    })
    .catch(erro => {
      console.error("Erro ao buscar por CNPJ:", erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function listar(req, res) {
  empresaModel.listar()
    .then(resultado => {
      res.status(200).json(resultado);
    })
    .catch(erro => {
      console.error("Erro ao listar empresas:", erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id)
    .then(resultado => {
      res.status(200).json(resultado);
    })
    .catch(erro => {
      console.error("Erro ao buscar por ID:", erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
  var { cnpj, razaoSocial, nomeFantasia, representante, telefone, senha, email } = req.body;

  if (!cnpj || !razaoSocial || !nomeFantasia || !representante || !telefone || !senha || !email) {
    return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser preenchidos!" });
  }

  empresaModel.buscarPorCnpj(cnpj)
    .then(resultado => {
      if (resultado.length > 0) {
        res.status(401).json({ mensagem: `A empresa com o CNPJ ${cnpj} já existe.` });
      } else {
        empresaModel.cadastrar(razaoSocial, nomeFantasia, cnpj, representante, telefone, senha, email)
          .then(resultado => {
            res.status(201).json(resultado);
          })
          .catch(erro => {
            console.error("Erro no cadastro:", erro);
            res.status(500).json(erro.sqlMessage);
          });
      }
    })
    .catch(erro => {
      console.error("Erro na verificação do CNPJ:", erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
