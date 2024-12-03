// Elementos DOM
const createForm = document.getElementById('createForm');
const relatoriosList = document.getElementById('relatorios-list');
const logoutBtn = document.getElementById('logout-btn');
const errorMessage = document.getElementById('error-message');
const userNameElement = document.getElementById('user-name');
const loginLink = document.getElementById('login-link');

// Configurações globais
const API_URL = 'http://localhost:3000/api/relatorios/criar';
const ERROR_MESSAGES = {
    loginRequired: 'Você precisa estar logado para acessar essa página.',
    creationError: 'Erro ao criar relatório. Verifique sua conexão ou tente novamente.',
    fieldsRequired: 'Todos os campos são obrigatórios!',
};

// Verifica login e inicializa página
document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName') || 'Visitante';

    // Atualiza nome do usuário ou redireciona se necessário


    // Configura botão de logout e oculta link de login
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.addEventListener('click', handleLogout);
    }
    if (loginLink) loginLink.style.display = 'none';

    // Exibe relatórios armazenados
    displayRelatorios();
});

// Função: Logout do usuário
function handleLogout() {
    localStorage.removeItem('userName');
    alert('Você foi desconectado.');
    window.location.href = 'login.html';
}

// Função: Exibir relatórios na lista
function displayRelatorios() {
    const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
    if (relatoriosList) {
        relatoriosList.innerHTML = '';
        relatorios.forEach((relatorio) => {
            const li = document.createElement('li');
            li.classList.add('report-item');
            li.innerHTML = `
                <h3>${relatorio.titulo}</h3>
                <p><strong>ID do Relatório:</strong> ${relatorio.aluno_id}</p>
                <p><strong>Conteúdo:</strong> ${relatorio.conteudo}</p>
            `;
            relatoriosList.appendChild(li);
        });
    }
}

// Função: Criar relatório
if (createForm) {
    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const aluno_id = document.getElementById('aluno_id').value.trim();
        const titulo = document.getElementById('titulo').value.trim();
        const conteudo = document.getElementById('conteudo').value.trim();

        // Validação de campos obrigatórios
        if (!aluno_id || !titulo || !conteudo) {
            alert(ERROR_MESSAGES.fieldsRequired);
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aluno_id, titulo, conteudo }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Relatório criado com sucesso!');
                createForm.reset();

                // Atualiza localStorage com novo relatório
                const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
                relatorios.push({ aluno_id, titulo, conteudo });
                localStorage.setItem('relatorios', JSON.stringify(relatorios));

                // Redireciona para página de visualização
                window.location.href = 'visualizar-relatorios.html';
            } else {
                throw new Error(data.message || 'Erro desconhecido');
            }
        } catch (error) {
            console.error(error);
            errorMessage.textContent = `Erro: ${error.message || ERROR_MESSAGES.creationError}`;
            errorMessage.style.color = 'red';
        }
    });
}
