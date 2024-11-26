const db = require('../config/db');

const User = {
    // Função para criar um usuário
    create: (nome, email, senha, role, callback) => {
        // Primeiro, vamos consultar o role_id baseado no nome do papel fornecido
        const sqlRole = 'SELECT id FROM roles WHERE nome = ?';
        
        db.query(sqlRole, [role], (err, result) => {
            if (err) {
                return callback(err); // Retorna erro se a consulta falhar
            }
            if (result.length === 0) {
                return callback(new Error('Papel inválido')); // Se não encontrar o papel, retorna erro
            }

            const roleId = result[0].id; // Obtém o role_id correspondente

            // Agora, podemos inserir o usuário na tabela usuarios com o role_id
            const sql = 'INSERT INTO usuarios (nome, email, senha, role_id) VALUES (?, ?, ?, ?)';
            
            db.query(sql, [nome, email, senha, roleId], callback);
        });
    },

    // Função para encontrar um usuário pelo e-mail
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(sql, [email], callback);
    },
};

module.exports = User;
