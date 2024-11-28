const express = require('express');
const router = express.Router();

// Rota de registro
router.post('/register', (req, res) => {
    // Implementação da lógica de registro
    res.json({ message: 'Usuário registrado com sucesso!' });
});

// Rota de login
router.post('/login', (req, res) => {
    // Implementação da lógica de login
    res.json({ message: 'Login realizado com sucesso!' });
});

module.exports = router;
