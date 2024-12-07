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


var feedRoutes = require("./src/routes/feed");

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuario");
//var avisosRouter = require("./src/routes/avisos")
var dashboardRouter = require("./src/routes/dashboard");
var cruzadinhaRoutes = require("./src/routes/cruzadinha");
var memoriaRoutes = require("./src/routes/memoria");


// Configuração dos middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Configuração das rotas
// Rotas
app.use("/feed", feedRoutes); // Configurando as rotas de avisos
app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
//app.use("/avisos", avisosRouter);
app.use("/quiz-resultados", usuarioRouter); 
app.use("/dashboard", dashboardRouter);
app.use("/cruzadinha", cruzadinhaRoutes);
app.use("/memoria", memoriaRoutes);

// Inicialização do servidor


app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
