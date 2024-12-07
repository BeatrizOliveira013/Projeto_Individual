const usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    usuarioModel.cadastrar(nome, email, senha)
        .then(() => res.status(201).send("Usuário cadastrado com sucesso!"))
        .catch((erro) => {
            console.error("Erro ao cadastrar usuário:", erro);
            res.status(500).send("Erro ao cadastrar usuário. Tente novamente mais tarde.");
        });
}

// Autenticar usuário
function autenticar(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios.");
    }

    usuarioModel.autenticar(email, senha)
        .then((usuarios) => {
            if (usuarios.length > 0) {
                const usuario = usuarios[0];
                console.log(`Usuário autenticado: ${usuario.id} - ${usuario.nome}`);
                res.status(200).json({
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                });
            } else {
                console.warn("Tentativa de login com credenciais inválidas.");
                res.status(401).send("Credenciais inválidas.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao autenticar usuário:", erro);
            res.status(500).send("Erro ao autenticar usuário. Tente novamente mais tarde.");
        });
}

// Salvar resultado do quiz
function salvarResultadoQuiz(req, res) {
    console.log("salvarResultadoQuiz foi chamado");
    const { usuario_id, perfil } = req.body;

    if (!usuario_id || !perfil) {
        return res.status(400).send("Dados insuficientes para salvar resultado do quiz.");
    }

    usuarioModel.salvarResultadoQuiz(usuario_id, perfil)
        .then(() => {
            console.log(`Resultado do quiz salvo para usuário ${usuario_id}: ${perfil}`);
            res.status(201).send("Resultado do quiz salvo com sucesso!");
        })
        .catch((erro) => {
            console.error(`Erro ao salvar resultado do quiz para usuário ${usuario_id}:`, erro);
            res.status(500).send("Erro ao salvar resultado do quiz.");
        });
}



// Salvar resultado do jogo da memória
function salvarResultadoMemoria(req, res) {
    const { usuario_id, tempo } = req.body;

    if (!usuario_id || !tempo) {
        return res.status(400).send("Dados insuficientes para salvar resultado do jogo da memória.");
    }

    usuarioModel.salvarResultadoMemoria(usuario_id, tempo)
        .then(() => {
            console.log(`Resultado do jogo da memória salvo para usuário ${usuario_id}: ${tempo}s`);
            res.status(201).send("Resultado do jogo da memória salvo com sucesso!");
        })
        .catch((erro) => {
            console.error(`Erro ao salvar resultado do jogo da memória para usuário ${usuario_id}:`, erro);
            res.status(500).send("Erro ao salvar resultado do jogo da memória.");
        });
}

// Obter resultados do quiz
function obterResultadosQuiz(req, res) {
    const { usuario_id } = req.params;

    if (!usuario_id) {
        return res.status(400).send("ID do usuário não fornecido.");
    }

    usuarioModel.obterResultadosQuiz(usuario_id)
        .then((resultados) => {
            console.log(`Resultados do quiz obtidos para usuário ${usuario_id}`);
            res.status(200).json(resultados);
        })
        .catch((erro) => {
            console.error(`Erro ao obter resultados do quiz para usuário ${usuario_id}:`, erro);
            res.status(500).send("Erro ao obter resultados do quiz.");
        });
}

// Obter resultados do jogo da memória
function obterResultadosMemoria(req, res) {
    const { usuario_id } = req.params;

    if (!usuario_id) {
        return res.status(400).send("ID do usuário não fornecido.");
    }

    usuarioModel.obterResultadosMemoria(usuario_id)
        .then((resultados) => {
            console.log(`Resultados do jogo da memória obtidos para usuário ${usuario_id}`);
            res.status(200).json(resultados);
        })
        .catch((erro) => {
            console.error(`Erro ao obter resultados do jogo da memória para usuário ${usuario_id}:`, erro);
            res.status(500).send("Erro ao obter resultados do jogo da memória.");
        });
}

// Obter dashboard com métricas (Jogos jogados, tempo médio, perfil mais comum)
function obterDashboard(req, res) {
    const { usuario_id } = req.params;

    if (!usuario_id) {
        return res.status(400).send("ID do usuário não fornecido.");
    }

    usuarioModel.obterDashboard(usuario_id)
        .then((dados) => {
            console.log(`Dashboard obtido para usuário ${usuario_id}`);
            res.status(200).json(dados);
        })
        .catch((erro) => {
            console.error(`Erro ao obter dashboard para usuário ${usuario_id}:`, erro);
            res.status(500).send("Erro ao obter dados do dashboard.");
        });
}

module.exports = {
    autenticar,
    cadastrar,
    salvarResultadoQuiz,
    salvarResultadoMemoria,
    obterResultadosQuiz,
    obterResultadosMemoria,
    obterDashboard,
};
