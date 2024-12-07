const usuarioModel = require("../models/usuarioModel");

// ✅ Função para cadastrar um novo usuário
async function cadastrar(req, res) {
    try {
        const { nome, email, senha } = req.body;

        // Validação de campos obrigatórios
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        // Chamada ao model para cadastrar o usuário
        await usuarioModel.cadastrar(nome, email, senha);

        // Resposta de sucesso
        return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return res.status(500).json({ message: "Erro ao cadastrar usuário. Tente novamente mais tarde." });
    }
}

// ✅ Função para autenticar o usuário (login)
async function autenticar(req, res) {
    try {
        const { email, senha } = req.body;

        // Validação de campos obrigatórios
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        // Chamada ao model para autenticar o usuário
        const usuarios = await usuarioModel.autenticar(email, senha);
        
        if (usuarios.length > 0) {
            const usuario = usuarios[0];
            // Resposta de sucesso (usuário autenticado)
            return res.status(200).json({ 
                id: usuario.id, 
                nome: usuario.nome, 
                email: usuario.email 
            });
        } else {
            // Resposta de erro (credenciais inválidas)
            return res.status(401).json({ message: "Credenciais inválidas." });
        }
    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        return res.status(500).json({ message: "Erro ao autenticar usuário. Tente novamente mais tarde." });
    }
}

// ✅ Função para salvar o resultado do quiz
async function salvarResultadoQuiz(req, res) {
    try {
        const { usuario_id, perfil } = req.body;

        // Validação de campos obrigatórios
        if (!usuario_id || !perfil) {
            return res.status(400).json({ message: "Dados insuficientes para salvar o resultado do quiz." });
        }

        // Chamada ao model para salvar o resultado do quiz
        await usuarioModel.salvarResultadoQuiz(usuario_id, perfil);
        return res.status(201).json({ message: "Resultado do quiz salvo com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar o resultado do quiz:", error);
        return res.status(500).json({ message: "Erro ao salvar o resultado do quiz." });
    }
}

// ✅ Função para obter os resultados do quiz
async function obterResultadosQuiz(req, res) {
    try {
        const { usuario_id } = req.params;

        if (!usuario_id) {
            return res.status(400).json({ message: "ID do usuário não fornecido." });
        }

        const resultados = await usuarioModel.obterResultadosQuiz(usuario_id);
        return res.status(200).json(resultados);
    } catch (error) {
        console.error(`Erro ao obter os resultados do quiz para o usuário (ID: ${usuario_id}):`, error);
        return res.status(500).json({ message: "Erro ao obter os resultados do quiz." });
    }
}

// Exportação das funções (para serem usadas no arquivo de rotas)
module.exports = {
    cadastrar,
    autenticar,
    salvarResultadoQuiz,
    obterResultadosQuiz
};
