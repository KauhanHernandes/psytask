// Elementos DOM
const createForm = document.getElementById('createForm');
const relatoriosList = document.getElementById('relatorios-list');
const logoutBtn = document.getElementById('logout-btn');
const errorMessage = document.getElementById('error-message');
const userNameElement = document.getElementById('user-name');
const loginLink = document.getElementById('login-link');

const ERROR_MESSAGES = {
    fieldsRequired: 'Todos os campos são obrigatórios!',
};

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName') || 'Visitante';
    userNameElement.textContent = userName;

    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.addEventListener('click', handleLogout);
    }
    if (loginLink) loginLink.style.display = 'none';
});

// Função: Logout
function handleLogout() {
    const body = document.body;

    body.classList.add('fade-out');

    setTimeout(() => {
        localStorage.removeItem('userName');
        window.location.href = 'login.html';
    }, 1000);
}

// Função: Adicionar relatório ao DOM
function addRelatorioToList({ aluno_id, titulo, conteudo }) {
    const li = document.createElement('li');
    li.classList.add('report-item');
    li.innerHTML = `
        <h3>${titulo}</h3>
        <p><strong>ID do Aluno:</strong> ${aluno_id}</p>
        <p><strong>Conteúdo:</strong> ${conteudo}</p>
    `;
    relatoriosList.appendChild(li);
}

// Função: Criar relatório
if (createForm) {
    createForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const aluno_id = document.getElementById('aluno_id').value.trim();
        const titulo = document.getElementById('titulo').value.trim();
        const conteudo = document.getElementById('conteudo').value.trim();

        // Validação de campos obrigatórios
        if (!aluno_id || !titulo || !conteudo) {
            alert(ERROR_MESSAGES.fieldsRequired);
            return;
        }

        addRelatorioToList({ aluno_id, titulo, conteudo });

        displaySuccessMessage(aluno_id, titulo);

        createForm.reset();
    });
}

// Função: Exibir mensagem de sucesso
function displaySuccessMessage(aluno_id, titulo) {
    const successAlert = document.getElementById('create-success');
    successAlert.querySelector('#new-report-id').textContent = aluno_id;
    successAlert.querySelector('#new-report-title').textContent = titulo;

    successAlert.classList.remove('hidden');

    const closeButton = document.getElementById('close-create-success');
    closeButton.addEventListener('click', () => {
        successAlert.classList.add('hidden');
    });
}
