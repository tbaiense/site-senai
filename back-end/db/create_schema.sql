 CREATE SCHEMA senai CHARACTER SET utf8mb4;
 
 USE senai;
 
 CREATE TABLE usuario (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(32) NOT NULL
 );
 
 CREATE TABLE mensagem (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    assunto ENUM("duvida", "matricula", "reclamacao") NOT NULL,
    curso_matricula VARCHAR(128),
    mensagem_adic TEXT
 );
