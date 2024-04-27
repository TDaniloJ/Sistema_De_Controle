
const db = firebase.firestore();
const clientesCollection = db.collection('clientes');

const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

const readClient = async () => {
    const snapshot = await clientesCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

const createClient = async (client) => {
    await clientesCollection.add(client);
}

const updateClient = async (clientId, client) => {
    await clientesCollection.doc(clientId).update(client);
}

const deleteClient = async (clientId) => {
    await clientesCollection.doc(clientId).delete();
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

// Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
    document.getElementById('nome').dataset.index = 'new';
    document.querySelector(".modal-header>h2").textContent = 'Novo Cliente';
}

const saveClient = async () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        };

        const index = document.getElementById('nome').dataset.index;

        if (index == 'new') {
            await createClient(client);
        } else {
            const clientId = document.getElementById('nome').dataset.clientId;
            await updateClient(clientId, client);
        }

        updateTable();
        closeModal();
    }
}

const createRow = (client) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green edit-button" data-id="${client.id}">Editar</button>
            <button type="button" class="button red delete-button" data-id="${client.id}">Excluir</button>
        </td>
    `;
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}

const clearTable = () => {
    const tbody = document.querySelector('#tableClient>tbody');
    tbody.innerHTML = '';
}

const updateTable = async () => {
    clearTable();
    const clients = await readClient();
    clients.forEach(createRow);
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('nome').dataset.index = 'edit';
    document.getElementById('nome').dataset.clientId = client.id;
    document.querySelector(".modal-header>h2").textContent = `Editando ${client.nome}`;
}

const editClient = async (clientId) => {
    const clients = await readClient();
    const client = clients.find(c => c.id === clientId);
    fillFields(client);
    openModal();
}

const editDelete = async (event) => {
    if (event.target.classList.contains('edit-button')) {
        const clientId = event.target.dataset.id;
        await editClient(clientId);
    } else if (event.target.classList.contains('delete-button')) {
        const clientId = event.target.dataset.id;
        const response = confirm(`Deseja realmente excluir o cliente?`);
        if (response) {
            await deleteClient(clientId);
            updateTable();
        }
    }
}

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('salvar').addEventListener('click', saveClient);
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);
document.getElementById('cancelar').addEventListener('click', closeModal);

// Atualizar a tabela na inicialização
updateTable();
