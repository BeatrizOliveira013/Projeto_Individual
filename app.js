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

const PORTA_APP = process.env.APP_PORT || 3333;
const HOST_APP = process.env.APP_HOST || 'localhost';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Importação das rotas
const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuario"); // Mantém o usuarioRouter para lidar com o cadastro de imagens
const quizRouter = require("./src/routes/quiz");
const dashboardRouter = require("./src/routes/dashboard");
const cruzadinhaRoutes = require("./src/routes/cruzadinha");
const memoriaRoutes = require("./src/routes/memoria");
const feedRoutes = require("./src/routes/feed");

// Configuração das rotas
app.use("/", indexRouter);
app.use("/usuario", usuarioRouter); // Aqui está a lógica de cadastro de usuário com upload de imagem
app.use("/quiz", quizRouter);
app.use("/dashboard", dashboardRouter);
app.use("/cruzadinha", cruzadinhaRoutes);
app.use("/memoria", memoriaRoutes);
app.use("/feed", feedRoutes);

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
