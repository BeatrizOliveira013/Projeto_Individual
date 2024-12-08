// Configuração do dotenv
const dotenv = require("dotenv");

// Carregamento das variáveis de ambiente do arquivo .env ou .env.dev
const caminho_env = process.env.AMBIENTE_PROCESSO === 'producao' ? '.env' : '.env.dev';
dotenv.config({ path: caminho_env });

// Verificação se a variável AMBIENTE foi carregada corretamente
if (!process.env.AMBIENTE_PROCESSO) {
    console.error("O AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js");
    process.exit(1); // Finaliza a execução se a variável não for encontrada
}

const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require('multer'); // Importa multer para fazer o upload de arquivos

const PORTA_APP = process.env.APP_PORT || 3333;
const HOST_APP = process.env.APP_HOST || 'localhost';

const app = express();

// Configuração de armazenamento de imagens usando multer
const storage = multer.diskStorage({
  destination: './public/assets', // Define o local de armazenamento das imagens
  filename: (req, file, cb) => {
    const nomeArquivo = `${Date.now()}-${file.originalname}`;
    cb(null, nomeArquivo);
  }
});

const upload = multer({ storage }); // Configuração final do multer

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());



// Importação das rotas
const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuario");
const quizRouter = require("./src/routes/quiz");
const dashboardRouter = require("./src/routes/dashboard");
const cruzadinhaRoutes = require("./src/routes/cruzadinha");
const memoriaRoutes = require("./src/routes/memoria");
const feedRoutes = require("./src/routes/feed");

// Configuração das rotas
app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/quiz", quizRouter);
app.use("/dashboard", dashboardRouter);
app.use("/cruzadinha", cruzadinhaRoutes);
app.use("/memoria", memoriaRoutes);
app.use("/feed", feedRoutes);

// Rota de cadastro de usuário com imagem
app.post('/usuarios/cadastro', upload.single('foto'), (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const imagem_perfil = req.file ? req.file.filename : null; // Pega o nome do arquivo gerado pelo multer

        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Nome, e-mail e senha são obrigatórios.' });
        }

        // Simulação de armazenamento no banco de dados
        const usuario = { 
            id: Date.now(), 
            nome, 
            email, 
            senha, 
            imagem_perfil: imagem_perfil ? `/assets/${imagem_perfil}` : null // Define o caminho da imagem
        };

        // Exemplo fictício de salvamento (substitua pelo banco real)
        console.log("Usuário salvo:", usuario);

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ mensagem: 'Erro ao cadastrar o usuário.' });
    }
});



// Tratamento de erro de rota não encontrada
app.use((req, res, next) => {
    res.status(404).json({ 
        erro: 'Rota não encontrada' 
    });
});

// Tratamento de erro interno do servidor
app.use((err, req, res, next) => {
    console.error(`Erro interno: ${err.message}`);
    res.status(500).json({ 
        erro: 'Erro interno do servidor' 
    });
});

// Inicialização do servidor
app.listen(PORTA_APP, function () {
    console.log(`Servidor rodando em: http://${HOST_APP}:${PORTA_APP}`);
});
