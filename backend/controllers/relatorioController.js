const Relatorio = require('../models/Relatorio');

// Função para criar um relatório
const criarRelatorio = (req, res) => {
    const { aluno_id, titulo, conteudo } = req.body;

    // Verificando se os dados obrigatórios foram fornecidos
    if (!aluno_id || !titulo || !conteudo) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    Relatorio.validarAluno(aluno_id, (err, aluno) => {
        if (err) {
            console.error('Erro ao verificar aluno:', err);
            return res.status(500).json({ message: 'Erro ao verificar aluno' });
        }

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }

        Relatorio.criarRelatorio(aluno_id, titulo, conteudo, (err, result) => {
            if (err) {
                console.error('Erro ao criar relatório:', err);
                return res.status(500).json({ message: 'Erro ao criar o relatório' });
            }
            res.status(201).json({ message: 'Relatório criado com sucesso', reportId: result.insertId });
        });
    });
};

// Função para listar todos os relatórios
const listarRelatorios = (req, res) => {
    Relatorio.listarRelatorios((err, relatorios) => {
        if (err) {
            console.error('Erro ao listar relatórios:', err);
            return res.status(500).json({ message: 'Erro ao listar os relatórios' });
        }
        res.status(200).json(relatorios);
    });
};

// Função para buscar um relatório específico pelo ID
const buscarRelatorio = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID do relatório é obrigatório' });
    }

    Relatorio.buscarRelatorio(id, (err, relatorio) => {
        if (err) {
            console.error('Erro ao buscar relatório:', err);
            return res.status(500).json({ message: 'Erro ao buscar o relatório' });
        }

        if (!relatorio) {
            return res.status(404).json({ message: 'Relatório não encontrado' });
        }

        res.status(200).json(relatorio);
    });
};

module.exports = {
    criarRelatorio,
    listarRelatorios,
    buscarRelatorio,
};
