const bcrypt = require('bcrypt');
const pool = require('../config/db.js');

// Função de registro de usuário
exports.register = async (req, res) => {
    const { nome, email, senha, role } = req.body;

    // Verificando se todos os campos são fornecidos
    if (!nome || !email || !senha || !role) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    try {
        // Verificando se o e-mail já existe
        const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'E-mail já cadastrado!' });
        }

        // Consultando o role_id correspondente ao papel (role) fornecido
        const [roleResult] = await pool.query('SELECT id FROM roles WHERE nome = ?', [role]);

        if (roleResult.length === 0) {
            return res.status(400).json({ error: 'Papel (role) inválido!' });
        }

        const roleId = roleResult[0].id;

        // Criptografando a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Inserindo o usuário no banco de dados com o role_id
        const [result] = await pool.query('INSERT INTO usuarios (nome, email, senha, role_id) VALUES (?, ?, ?, ?)', [nome, email, hashedPassword, roleId]);

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cadastrar o usuário!' });
    }
};

// Função de login de usuário
exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    // Verificando se os campos obrigatórios estão presentes
    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios!' });
    }

    try {
        // Consultando o usuário pelo e-mail
        const [user] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        // Verificando se a senha é válida
        const validPassword = await bcrypt.compare(senha, user[0].senha);

        if (!validPassword) {
            return res.status(401).json({ message: 'Senha incorreta!' });
        }

        // Retornando uma resposta de sucesso com os dados do usuário, incluindo o role_id
        res.status(200).json({
            message: 'Login bem-sucedido!',
            user: {
                id: user[0].id,
                nome: user[0].nome,
                role_id: user[0].role_id
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
};
