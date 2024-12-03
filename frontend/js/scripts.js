// URL base dinâmica (local ou produção)
const baseURL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : ''; 

// Função para exibir mensagens de feedback com animação
function showFeedbackMessage(message, isError = false) {
    const feedbackMessage = document.getElementById('feedback-message');
    if (!feedbackMessage) return;

    feedbackMessage.textContent = message;

    feedbackMessage.classList.remove('error', 'hidden');
    if (isError) {
        feedbackMessage.classList.add('error');
    } else {
        feedbackMessage.classList.remove('error');
    }

    feedbackMessage.classList.add('show');

    setTimeout(() => {
        feedbackMessage.classList.remove('show');
        feedbackMessage.classList.add('hidden');
    }, 3000);
}

// Função para simular animação de carregamento no botão
function toggleButtonLoadingState(button, isLoading) {
    if (!button) return;

    const spinner = button.querySelector('.spinner');
    if (isLoading) {
        button.disabled = true;
        if (!spinner) {
            const loadingSpinner = document.createElement('div');
            loadingSpinner.classList.add('spinner');
            button.appendChild(loadingSpinner);
        }
    } else {
        button.disabled = false;
        if (spinner) {
            button.removeChild(spinner);
        }
    }
}

// Função para validar campos do formulário
function validateForm(fields) {
    for (const field of fields) {
        if (!field.value.trim()) {
            showFeedbackMessage(`O campo ${field.placeholder || field.name} é obrigatório.`, true);
            return false;
        }
    }
    return true;
}

// Evento de registro do formulário
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const role = document.getElementById('role');
    const registerButton = document.querySelector('#registerForm .btn');

    // Validação simples
    if (!validateForm([nome, email, senha, role])) return;

    try {
        toggleButtonLoadingState(registerButton, true);

        const response = await fetch(`${baseURL}/auth/register`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome.value.trim(),
                email: email.value.trim(),
                senha: senha.value.trim(),
                role: role.value.trim(),
            }),
        });

        const data = await response.json();

        if (response.ok) {
            showFeedbackMessage('Cadastrado com sucesso!');
            document.getElementById('registerForm').reset();
        } else {
            showFeedbackMessage(data.message || 'Erro ao registrar usuário.', true);
        }
    } catch (error) {
        console.error(error);
        showFeedbackMessage('Erro na conexão com o servidor.', true);
    } finally {
        toggleButtonLoadingState(registerButton, false);
    }
});

// Evento de login do formulário (sem autenticação)
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail');
    const senha = document.getElementById('loginSenha');

    // Validação simples (apenas verificando se os campos estão preenchidos)
    if (!validateForm([email, senha])) return;

    // Redireciona diretamente para a página sem autenticação
    showFeedbackMessage('Login bem-sucedido!');
    window.location.href = 'reltest.html';
});

// Alternância entre as abas de login e registro
document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');

    const toggleTabs = (activateTab, deactivateTab, activateSection, deactivateSection) => {
        activateTab?.classList.add('active');
        deactivateTab?.classList.remove('active');
        activateSection?.classList.add('active-section');
        deactivateSection?.classList.remove('active-section');
    };

    loginTab?.addEventListener('click', () => toggleTabs(loginTab, registerTab, loginSection, registerSection));
    registerTab?.addEventListener('click', () => toggleTabs(registerTab, loginTab, registerSection, loginSection));
});
