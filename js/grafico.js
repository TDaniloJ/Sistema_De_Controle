import { estadosCollection, clientesCollection, exportDocs } from "./firebaseConfig.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


let clientsByState = {};


async function countClientsByState() {
    try {
        const estadosSnapshot = await getDocs(estadosCollection);
        const clientesSnapshot = await getDocs(clientesCollection);

        clientsByState = {};

        const estadosMap = {};
        estadosSnapshot.forEach((estadoDoc) => {
            const estadoData = estadoDoc.data();
            const estadoId = estadoDoc.id;
            const estadoNome = estadoData.nome;
            estadosMap[estadoId] = estadoNome;
        });

        clientesSnapshot.forEach((clienteDoc) => {
            const clienteData = clienteDoc.data();
            const clienteEstadoId = clienteData.estado;

            if (clienteEstadoId && estadosMap[clienteEstadoId]) {
                const estadoNome = estadosMap[clienteEstadoId];

                clientsByState[estadoNome] = (clientsByState[estadoNome] || 0) + 1;
            }
        });
    } catch (error) {
        console.error("Erro ao obter documentos do Firestore:", error);
    }
}

function renderChart(labels, data) {
    const ctx = document.getElementById("chart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Clientes por Estado',
                backgroundColor: 'rgba(161, 198, 247, 1)',
                borderColor: 'rgb(47, 128, 237)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(47, 128, 237)',
                hoverBorderColor: 'rgb(47, 128, 237)',
                data: data,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        },
    });
}

async function generateChart() {
    await countClientsByState();

    const labels = Object.keys(clientsByState);
    const data = Object.values(clientsByState);

    renderChart(labels, data);
}

generateChart();
