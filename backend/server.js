const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const relatorioRoutes = require('./routes/relatorioRoutes');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware para permitir CORS
app.use(cors());

app.use(cors({
    origin: 'https://psytask.vercel.app', // Permitir apenas requisições dessa URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

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
