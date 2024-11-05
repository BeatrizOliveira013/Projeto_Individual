create database pubg;
USE pubg;

create table usuario (id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(100),
senha CHAR(8));

SELECT * FROM usuario;