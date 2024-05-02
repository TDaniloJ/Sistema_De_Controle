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