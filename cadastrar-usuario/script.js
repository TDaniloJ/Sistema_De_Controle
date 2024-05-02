import { createUserAndAddUserInfo } from "../firebase.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    // Adicione um listener para o evento de submit do formulário
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); 

        // Captura os valores dos campos do formulário
        const nome = form.querySelector('input[name="nome"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const senha = form.querySelector('input[name="senha"]').value;
        const confirmarSenha = form.querySelector('input[name="confirmarSenha"]').value;
        const funcaoAdmin = form.querySelector('input[id="dot-1"]:checked'); 
        const funcaoUsuario = form.querySelector('input[id="dot-2"]:checked');

        // Verifica se o e-mail é válido
        if (!isValidEmail(email)) {
            alert("Por favor, insira um endereço de e-mail válido.");
            return; 
        }

        // Verifica se as senhas coincidem
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem. Por favor, digite novamente.");
            return;
        }

        // Verifica se a função de admin ou usuário foi selecionada
        if (funcaoAdmin || funcaoUsuario) {
            try {
                // Cria o usuário e adiciona informações no Firestore
                await createUserAndAddUserInfo(email, senha, funcaoAdmin ? true : false);
                alert("Usuário cadastrado com sucesso!");
                form.reset(); 
            } catch (error) {
                console.error("Erro ao cadastrar usuário:", error);
                alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
            }
        } else {
            alert("Por favor, selecione uma função (admin ou usuário).");
        }
    });

});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

const goToUsers = document.getElementById('go-to-users');
goToUsers.addEventListener("click", function () {
    window.location.href = '../cadastrar-usuario/index.html'
});

const goToClients = document.getElementById('go-to-clients');
goToClients.addEventListener("click", function () {
    window.location.href = '../cadastrar-cliente/index.html'
});

const goToDash = document.getElementById('go-to-dash');
goToDash.addEventListener("click", function () {
    window.location.href = '../dashboard-admin/index.html'
});

const logOut = document.getElementById('log-out');
logOut.addEventListener("click", function () {
    const confirmLogout = confirm("Tem certeza de que deseja sair?");

    if (confirmLogout) {
        window.location.href = '../index.html';
    } else {
    }
});
