const express = require('express');
const router = express.Router();

// Rota de registro
router.post('/register', (req, res) => {
    res.json({ message: 'Usuário registrado com sucesso!' });
});

// Rota de login
router.post('/login', (req, res) => {
    res.json({ message: 'Login realizado com sucesso!' });
});

module.exports = router;
