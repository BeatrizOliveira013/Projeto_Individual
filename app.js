// Configuração do ambiente
const dotenv = require("dotenv");
const caminho_env = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev';
dotenv.config({ path: caminho_env });

// Importação das dependências
const express = require("express");
const cors = require("cors");
const path = require("path");

// Definição da porta e do host a partir das variáveis de ambiente
const PORTA_APP = process.env.APP_PORT || 3333;
const HOST_APP = process.env.APP_HOST || 'localhost';

const app = express();

// Importação das rotas
const feedRoutes = require("./src/routes/feed");
const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuario");
const dashboardRouter = require("./src/routes/dashboard");
const cruzadinhaRoutes = require("./src/routes/cruzadinha");
const memoriaRoutes = require("./src/routes/memoria");
const quizRouter = require("./src/routes/quiz"); // Rota do quiz foi adicionada

// Configuração dos middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Alterado de false para true para permitir objetos complexos
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Configuração das rotas
app.use("/feed", feedRoutes); 
app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/quiz", quizRouter); // Agora o quiz possui sua própria rota
app.use("/dashboard", dashboardRouter);
app.use("/cruzadinha", cruzadinhaRoutes);
app.use("/memoria", memoriaRoutes);

// Inicialização do servidor com try/catch para capturar erros de inicialização
try {
    app.listen(PORTA_APP, () => {
        console.log(`
-------------------------------------------------------
🚀 Servidor rodando em: http://${HOST_APP}:${PORTA_APP}
🌐 Ambiente atual: ${process.env.AMBIENTE_PROCESSO || 'desenvolvimento'}
📦 Banco de dados: ${process.env.NODE_ENV === 'production' ? 'Remoto' : 'Local'}
-------------------------------------------------------
        `);
    });
} catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
}
