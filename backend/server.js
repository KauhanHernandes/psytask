const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const relatorioRoutes = require('./routes/relatorioRoutes');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware para permitir CORS de qualquer origem (desabilitado)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Middleware para parsear JSON no corpo da requisição
app.use(bodyParser.json());

// Rota principal
app.get('/', (req, res) => {
    res.status(200).send('Servidor funcionando!');
});

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de relatórios
app.use('/api/relatorios', relatorioRoutes);

// Middleware para tratar rotas inexistentes
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

// Middleware para tratar erros genéricos
app.use((err, req, res, next) => {
    console.error('Erro interno:', err);
    res.status(500).json({ message: 'Erro interno no servidor.' });
});

// Iniciar o servidor
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
