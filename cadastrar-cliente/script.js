import { exportClients, addDocuments, editDocuments, deleteDocuments } from "../firebase.js";

const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCidade = document.querySelector('#m-cidade');
const sEmail = document.querySelector('#m-email');
const sTelefone = document.querySelector('#m-telefone');
const sCpf = document.querySelector('#m-cpf');
const btnSalvar = document.querySelector('#btnSalvar');
const addNew = document.querySelector('#new');

let itemId;

// Função para validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');    
  if (cpf === '') return false; 
  // Elimina CPFs invalidos conhecidos    
  if (cpf.length !== 11 || 
      cpf === '00000000000' || 
      cpf === '11111111111' || 
      cpf === '22222222222' || 
      cpf === '33333333333' || 
      cpf === '44444444444' || 
      cpf === '55555555555' || 
      cpf === '66666666666' || 
      cpf === '77777777777' || 
      cpf === '88888888888' || 
      cpf === '99999999999') {
      return false;
  }       
  // Valida 1o digito 
  let add = 0;    
  for (let i=0; i < 9; i ++)       
      add += parseInt(cpf.charAt(i)) * (10 - i);  
  let rev = 11 - (add % 11);  
  if (rev === 10 || rev === 11)     
      rev = 0;    
  if (rev !== parseInt(cpf.charAt(9)))     
      return false;       
  // Valida 2o digito 
  add = 0;    
  for (let i = 0; i < 10; i ++)        
      add += parseInt(cpf.charAt(i)) * (11 - i);  
  rev = 11 - (add % 11);  
  if (rev === 10 || rev === 11) 
       rev = 0;    
  if (rev !== parseInt(cpf.charAt(10)))
       return false;       
  return true;   
}

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
      sCpf.value = item.cpf;
      itemId = id;
    }
  } else {
    sNome.value = '';
    sCidade.value = '';
    sEmail.value = '';
    sTelefone.value = '';
    sCpf.value = '';
    itemId = null;
  }
}

addNew.onclick = () => openModal();

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

  if (sNome.value == '' || sCidade.value == '' || sEmail.value == '' || sTelefone.value == '' || sCpf.value == '') {
    return;
  }

  if (!validarCPF(sCpf.value)) {
    alert('CPF inválido. Por favor, insira um CPF válido.');
    return;
  }

  const newItem = {
    nome: sNome.value,
    cidade: sCidade.value,
    email: sEmail.value,
    telefone: sTelefone.value,
    cpf: sCpf.value
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
      <td>${item.cpf}</td>
      <td class="acao">
        <button class="editBtn"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button class="deleteBtn"><i class='bx bx-trash'></i></button>
      </td>
    `;
    tbody.appendChild(tr);

    tr.querySelector('.editBtn').addEventListener('click', () => editItem(item.id));
    tr.querySelector('.deleteBtn').addEventListener('click', () => deleteItem(item.id));
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
