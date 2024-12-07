// Configuração do ambiente
var ambiente_processo = 'desenvolvimento'; 
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

// Carrega as variáveis de ambiente do arquivo correto
require("dotenv").config({ path: caminho_env });

// Importação das dependências
var express = require("express");
var cors = require("cors");
var path = require("path");

// Definição da porta e do host a partir das variáveis de ambiente
var PORTA_APP = process.env.APP_PORT || 3333;
var HOST_APP = process.env.APP_HOST || 'localhost';

var app = express();

// Importação de rotas
const feedRoutes = require("./src/routes/feed");
const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuario");
const dashboardRouter = require("./src/routes/dashboard");
const cruzadinhaRoutes = require("./src/routes/cruzadinha");
const memoriaRoutes = require("./src/routes/memoria");
const quizRouter = require("./src/routes/quiz"); // Rota do quiz foi adicionada

// Configuração dos middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Configuração das rotas
app.use("/", indexRouter);
app.use("/feed", feedRoutes);
app.use("/usuario", usuarioRouter);
app.use("/quiz", quizRouter); 
app.use("/dashboard", dashboardRouter);
app.use("/cruzadinha", cruzadinhaRoutes);
app.use("/memoria", memoriaRoutes);

// Inicialização do servidor
app.listen(PORTA_APP, function () {
    console.log(`
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :.
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:.
    Para alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'
    `);
});
