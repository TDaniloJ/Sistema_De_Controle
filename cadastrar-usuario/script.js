import { createUserAndAddUserInfo } from "../firebase.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = form.querySelector('input[name="nome"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const senha = form.querySelector('input[name="senha"]').value;
        const confirmarSenha = form.querySelector('input[name="confirmarSenha"]').value;
        const cnpj = form.querySelector('input[name="cnpj"]').value;
        const telefone = form.querySelector('input[name="telefone"]').value;
        const funcaoAdmin = form.querySelector('input[id="dot-1"]:checked');
        const funcaoUsuario = form.querySelector('input[id="dot-2"]:checked');

        if (!isValidEmail(email)) {
            alert("Por favor, insira um endereço de e-mail válido.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem. Por favor, digite novamente.");
            return;
        }

        if (!validarCNPJ(cnpj)) {
            alert("CNPJ inválido. Por favor, insira um CNPJ válido.");
            return;
        }

        if (!validarTelefone(telefone)) {
            alert("Telefone inválido. Por favor, insira um telefone válido.");
            return;
        }

        if (funcaoAdmin || funcaoUsuario) {
            try {
                await createUserAndAddUserInfo(email, senha, funcaoAdmin ? true : false, nome, cnpj, telefone);
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

function validarCNPJ(cnpj) {
    // Remova caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, '');

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
        return false;
    }

   
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) {
        return false;
    }
    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) {
        return false;
    }

    return true;
}

function validarTelefone(telefone) {
 
    const telefoneNumerico = telefone.replace(/\D/g, '');

  
    if (telefoneNumerico.length !== 10 && telefoneNumerico.length !== 11) {
        return false;
    }

    return true;
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

const mainToDash = document.getElementById('main-to-dash');
mainToDash.addEventListener("click", function () {
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
