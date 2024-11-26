const express = require('express');
const {
    criarRelatorio,
    listarRelatorios,
    buscarRelatorio,
} = require('../controllers/relatorioController');

const router = express.Router();

/**
 * @route POST /api/relatorios/criar
 * @description Cria um novo relatório
 */
router.post('/criar', criarRelatorio);

/**
 * @route GET /api/relatorios
 * @description Lista todos os relatórios
 */
router.get('/', listarRelatorios);

/**
 * @route GET /api/relatorios/:id
 * @description Busca um relatório específico pelo ID
 */
router.get('/:id', buscarRelatorio);

module.exports = router;
