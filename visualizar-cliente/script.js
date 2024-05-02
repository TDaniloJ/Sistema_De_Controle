import { exportClients, addDocuments, editDocuments, deleteDocuments } from "../firebase.js";

const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCidade = document.querySelector('#m-cidade');
const sEmail = document.querySelector('#m-email');
const sTelefone = document.querySelector('#m-telefone');
const btnSalvar = document.querySelector('#btnSalvar');
const addNew = document.querySelector('#new');

let itemId;

async function openModal(edit = false, id = null) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit && id !== null) {
    const item = await getItemById(id);
    if (item) {
      sNome.value = item.nome;
      sCidade.value = item.cidade;
      sEmail.value = item.email;
      sTelefone.value = item.telefone;
      itemId = id;
    }
  } else {
    sNome.value = '';
    sCidade.value = '';
    sEmail.value = '';
    sTelefone.value = '';
    itemId = null;
  }
}


async function editItem(id) {
  openModal(true, id);
}

async function deleteItem(id) {
  if (confirm("Confirmar a remoção?")) {
    await deleteDocuments('clientes', id);
    await loadItens();
  }
}

async function insertItem(item) {
  await addDocuments('clientes', item); 
  await loadItens();
}

async function updateItem(item) {
  await editDocuments('clientes', itemId, item);
  await loadItens();
}

btnSalvar.onclick = async (e) => {
  e.preventDefault();

  if (sNome.value == '' || sCidade.value == '' || sEmail.value == '' || sTelefone.value == '') {
    return;
  }

  const newItem = {
    nome: sNome.value,
    cidade: sCidade.value,
    email: sEmail.value,
    telefone: sTelefone.value
  };

  if (itemId) {
    newItem.id = itemId;
    await updateItem(newItem);
  } else {
    await insertItem(newItem);
  }

  modal.classList.remove('active');
}

async function loadItens() {
  tbody.innerHTML = '';

  const querySnapshot = await exportClients('clientes');
  const itens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  itens.forEach((item, index) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.cidade}</td>
      <td>${item.email}</td>
      <td>${item.telefone}</td>
    `;
    tbody.appendChild(tr);
  });
}

async function getItemById(id) {
  const querySnapshot = await exportClients('clientes');
  const item = querySnapshot.docs.find(doc => doc.id === id);
  return item ? { id: item.id, ...item.data() } : null;
}

loadItens();


const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

const goToClients = document.getElementById('go-to-clients');
goToClients.addEventListener("click", function () {
    window.location.href = '../visualizar-cliente/index.html'
});

const goToDash = document.getElementById('go-to-dash');
goToDash.addEventListener("click", function () {
    window.location.href = '../dashboard-user/index.html'
});

const mainToDash = document.getElementById('main-to-dash');
mainToDash.addEventListener("click", function () {
    window.location.href = '../dashboard-user/index.html'
});

const logOut = document.getElementById('log-out');
logOut.addEventListener("click", function () {
    const confirmLogout = confirm("Tem certeza de que deseja sair?");

    if (confirmLogout) {
        window.location.href = '../index.html';
    } else {
    }
});