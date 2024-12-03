const db = require('../config/db');

// Função para criar um usuário

const User = {
    create: (nome, email, senha, role, callback) => {
        const sqlRole = 'SELECT id FROM roles WHERE nome = ?';
        
        db.query(sqlRole, [role], (err, result) => {
            if (err) {
                return callback(err);
            }
            if (result.length === 0) {
                return callback(new Error('Papel inválido'));
            }

            const roleId = result[0].id;
            const sql = 'INSERT INTO usuarios (nome, email, senha, role_id) VALUES (?, ?, ?, ?)';
            db.query(sql, [nome, email, senha, roleId], callback);
        });
    },

    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(sql, [email], callback);
    },
};

module.exports = User;
