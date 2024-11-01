-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

create database queijonopontodb;
use queijonopontodb;

create table empresa(
    idempresa int primary key auto_increment,
    razaosocial varchar(45),
    nomefantasia varchar(45),
    cnpj char(14),
    nome varchar(45),
    cpf char(11),
    email varchar(60),
	senha varchar(45),
    telefone varchar(15),
    data_cadastro timestamp default current_timestamp
)auto_increment=101;

create table endereco(
	idendereco int primary key auto_increment,
	logradouro varchar(45),
	numero char(6),
	cidade varchar(45),
	cep char(9),
	fkempresa int unique,
	foreign key (fkempresa)  references empresa(idempresa)
)auto_increment=101;

create table login(
	idlogin int primary key auto_increment,
	email varchar(45),
	senha varchar(45)
)auto_increment=101;

create table usuario(
    idusuario int auto_increment,
    nome varchar(45),
    cpf varchar(11) not null unique,
    telefone varchar(15),
    nomenivelacesso varchar(45),
    fkempresa int unique,
    fknivelacesso int not null,
    fkendereco int unique,
    fklogin int not null,
	foreign key (fkendereco) references endereco(idendereco),
    foreign key (fkempresa) references empresa(idempresa),
    foreign key (fknivelacesso) references usuario(idusuario),
    foreign key (fklogin) references login(idlogin),
    primary key (idusuario, fknivelacesso, fklogin)
)auto_increment=101; 

create table localmaturacao (
    idlocalmaturacao int auto_increment primary key,
    nomelocal varchar(100), -- nome do local de maturação (ex: "sala de maturação 1")
    descricaolocal varchar(255), -- descrição do local
    temperaturaideal decimal(5,2), -- temperatura ideal para maturação
    umidadeideal decimal(5,2), -- umidade ideal para maturação
    capacidadeprateleiras int, -- número de prateleiras na sala
    fkempresa int unique,
    foreign key (fkempresa) references empresa(idempresa) -- relaciona com a empresa que possui o local
)auto_increment=101;

create table localmaturacaousuario (
	idlocalmaturacaousuario int primary key auto_increment,
	fklocalmaturacao int,
    fkusuario int,  
    dataassociacao date,
    foreign key (fklocalmaturacao) references localmaturacao(idlocalmaturacao),
    foreign key (fkusuario) references usuario(idusuario)
);


create table prateleira (
    idprateleira int auto_increment primary key,
    identificacaoprateleira varchar(50), -- identificação única da prateleira (ex: "prateleira a1", "prateleira b3")
    capacidademaxima int, -- capacidade máxima de queijos na prateleira
    altura decimal(5,2), -- altura da prateleira na sala (em metros)
    largura decimal(5,2), -- largura da prateleira (em metros)
    profundidade decimal(5,2), -- profundidade da prateleira (em metros)
    quantidadetotal int, -- quantidade total desse tipo de sensor
	fklocalmaturacao int, -- relaciona a prateleira com o local de maturação
    foreign key (fklocalmaturacao) references localmaturacao(idlocalmaturacao)
)auto_increment=101;

create table sensorprateleira (
    idsensorprateleira int primary key auto_increment,
    nivelprateleira int,
    datainstalacao date, -- data de instalação do sensor
    quantidadetotal int,
	fkprateleira int,
    foreign key (fkprateleira) references prateleira(idprateleira)
)auto_increment=101;

create table tiposensor (
    idsensor int auto_increment,
    nome varchar(45) not null, -- nome do sensor (lm35, dht11)
    constraint chknome check (nome in('lm35', 'dht11')),
    tipo varchar(45) not null, -- tipo de grandeza medida (temperatura, umidade)
    unidademedida varchar(5) not null, -- unidade de medida (°c, %)
    fksensorprateleira int,
    primary key (idsensor, fksensorprateleira),
	foreign key (fksensorprateleira) references sensorprateleira (idsensorprateleira)
)auto_increment=101;

create table dadossensores (
    iddadossensor int auto_increment,
	fksensorprateleira int, 
    datahora timestamp default current_timestamp, -- armazena o momento da leitura
    temperatura decimal(5,2), -- armazena a temperatura coletada
    umidade decimal(5,2), -- armazena a umidade coletada
    primary key (iddadossensor, fksensorprateleira),
    foreign key (fksensorprateleira) references sensorprateleira(idsensorprateleira) -- relaciona com o sensor de temperatura
)auto_increment=101;

create table alertasensor (
    idalertasensor int auto_increment,
    datahora timestamp default current_timestamp, -- data e hora do alerta
    tipoalerta varchar(50), -- ex: "temperatura alta", "umidade baixa"
    descricaoalerta varchar(255),
	valorminimo decimal(5,2), -- faixa mínima de operação
    valormaximo decimal(5,2), -- faixa máxima de operação
	fksensorprateleira int,
    primary key (idalertasensor, fksensorprateleira),
    foreign key (fksensorprateleira) references sensorprateleira(idsensorprateleira)
)auto_increment=101;
