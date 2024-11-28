-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE IF NOT EXISTS pubg;

USE pubg;


-- Tabela de Usuários
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

SELECT * FROM usuario;

-- Tabela de Resultados do Quiz
CREATE TABLE quiz_resultados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    perfil VARCHAR(50) NOT NULL,
    data_quiz TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

SELECT * FROM quiz_resultados;

-- Tabela de Resultados do Jogo da Memória
CREATE TABLE memoria_resultados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tempo VARCHAR(10) NOT NULL,
    data_jogo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

SELECT * FROM memoria_resultados;

-- Tabela de Resultados da Cruzadinha
CREATE TABLE cruzadinha_resultados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    pontuacao INT NOT NULL,
    numero_erros INT NOT NULL,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);
CREATE TABLE perguntas_cruzadinha (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(255) NOT NULL
);


-- Tabela de Erros na Cruzadinha
CREATE TABLE cruzadinha_erros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    pergunta_id INT NOT NULL,
    data_erro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);



-- Tabela de Postagens no Feed
CREATE TABLE feed_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    texto TEXT NOT NULL,
    data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

SELECT * FROM feed_posts;

-- Comandos úteis
SHOW TABLES;
SELECT * FROM usuario;
SELECT * FROM quiz_resultados;
SELECT * FROM memoria_resultados;
SELECT * FROM cruzadinha_resultados;
SELECT * FROM cruzadinha_erros;


      SELECT 
            CASE
                WHEN pontuacao <= 20 THEN '0-20'
                WHEN pontuacao <= 40 THEN '21-40'
                WHEN pontuacao <= 60 THEN '41-60'
                WHEN pontuacao <= 80 THEN '61-80'
                ELSE '81-100'
            END AS faixa,
            COUNT(*) AS total
        FROM cruzadinha_resultados
        GROUP BY faixa