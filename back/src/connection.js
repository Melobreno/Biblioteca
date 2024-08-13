const mysql = require("mysql2/promise"); //Importando mysql

//Cria um Poool de conexões com o banco de dados
const connection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "teste_node",
});

//exporta a conexão feita
module.exports = connection;
