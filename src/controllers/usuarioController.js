const usuarioModel = require("../models/usuarioModel");

async function autenticar(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        const usuarios = await usuarioModel.autenticar(email, senha);
        
        if (usuarios.length > 0) {
            const usuario = usuarios[0];
            return res.status(200).json({ 
                id: usuario.id, 
                nome: usuario.nome, 
                email: usuario.email,
                imagem_perfil: usuario.imagem_perfil 
            });
        } else {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }
    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        return res.status(500).json({ message: "Erro ao autenticar usuário." });
    }
}

async function cadastrarUsuarioComImagem(req, res) {
    try {
        const { nome, email, senha } = req.body;
        const imagem_perfil = req.file ? req.file.filename : null;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        await usuarioModel.cadastrarComImagem(nome, email, senha, imagem_perfil);
        return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar usuário com imagem:", error);
        return res.status(500).json({ message: "Erro ao cadastrar usuário." });
    }
}

module.exports = {
    autenticar,
    cadastrarUsuarioComImagem
};
