const express = require('express');
const {
    criarRelatorio,
    listarRelatorios,
    buscarRelatorio,
} = require('../controllers/relatorioController');

const router = express.Router();

router.post('/criar', criarRelatorio);

router.get('/', listarRelatorios);

router.get('/:id', buscarRelatorio);

module.exports = router;
