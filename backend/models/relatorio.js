const connection = require('../config/db');

// Função para validar se o aluno existe
const validarAluno = (aluno_id, callback) => {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    connection.query(query, [aluno_id], (err, results) => {
        if (err) {
            console.error('Erro ao verificar aluno:', err);
            return callback(err);
        }

        // Verifica se o aluno existe
        const alunoExiste = results.length > 0 ? results[0] : null;
        callback(null, alunoExiste);
    });
};

// Função para criar um relatório
const criarRelatorio = (aluno_id, titulo, conteudo, callback) => {
    const query = 'INSERT INTO relatorios (aluno_id, titulo, conteudo) VALUES (?, ?, ?)';
    connection.query(query, [aluno_id, titulo, conteudo], (err, result) => {
        if (err) {
            console.error('Erro ao criar relatório:', err);
            return callback(err);
        }
        callback(null, result);
    });
};

// Função para listar todos os relatórios
const listarRelatorios = (callback) => {
    const query = `
        SELECT r.id, r.titulo, r.conteudo, r.criado_em, u.nome AS aluno_nome
        FROM relatorios r
        JOIN usuarios u ON r.aluno_id = u.id
        ORDER BY r.criado_em DESC
    `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao listar relatórios:', err);
            return callback(err);
        }
        callback(null, results);
    });
};

// Função para buscar um relatório por ID
const buscarRelatorio = (id, callback) => {
    const query = `
        SELECT r.id, r.titulo, r.conteudo, r.criado_em, u.nome AS aluno_nome
        FROM relatorios r
        JOIN usuarios u ON r.aluno_id = u.id
        WHERE r.id = ?
    `;
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar relatório:', err);
            return callback(err);
        }

        // Verifica se o relatório foi encontrado
        const relatorio = results.length > 0 ? results[0] : null;
        callback(null, relatorio);
    });
};

module.exports = {
    criarRelatorio,
    listarRelatorios,
    buscarRelatorio,
    validarAluno,
};
