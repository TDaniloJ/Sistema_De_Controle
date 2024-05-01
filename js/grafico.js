import { estadosCollection, clientesCollection } from "./firebaseConfig.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

let clientsByState = {};

async function countClientsByState() {
    try {
        const estadosSnapshot = await getDocs(estadosCollection);
        const clientesSnapshot = await getDocs(clientesCollection);

        const estadosMap = {};
        estadosSnapshot.forEach((estadoDoc) => {
            const estadoData = estadoDoc.data();
            const estadoId = estadoDoc.id;
            const estadoNome = estadoData.nome.toLowerCase().trim();
            estadosMap[estadoNome] = estadoData.nome;
        });

        const clientsByState = {};
        clientesSnapshot.forEach((clienteDoc) => {
            const clienteData = clienteDoc.data();
            const clienteEstadoNome = clienteData.cidade.toLowerCase().trim();

            let estadoEncontrado = false;
            for (const estadoNome in estadosMap) {
                if (estadoNome.includes(clienteEstadoNome)) {
                    const estadoOriginal = estadosMap[estadoNome];
                    clientsByState[estadoOriginal] = (clientsByState[estadoOriginal] || 0) + 1;
                    estadoEncontrado = true;
                    break;
                }
            }

            if (!estadoEncontrado) {
                console.log("Estado inválido ou não mapeado:", clienteData.estado);
            }
        });

        console.log("Clients by State (final):", clientsByState);
        return clientsByState;
    } catch (error) {
        console.error("Erro ao obter documentos do Firestore:", error);
        return null;
    }
}


function renderChart(labels, data) {
    const ctx = document.getElementById("chart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Clientes',
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
    const clientsByState = await countClientsByState();
    
    if (clientsByState) {
        const labels = Object.keys(clientsByState);
        const data = Object.values(clientsByState);

        renderChart(labels, data);
    } else {
        console.log("Nenhum estado encontrado.");
    }
}

generateChart();
