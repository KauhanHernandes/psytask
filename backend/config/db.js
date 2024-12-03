require('dotenv').config();
const mysql = require('mysql2');

// Usando a URL de conexão
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        process.exit(1); 
    } else {
        console.log('Conexão ao banco de dados estabelecida com sucesso!');
    }
});

const promiseConnection = connection.promise();

module.exports = promiseConnection;
