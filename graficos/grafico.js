import { clients } from "../firebase.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

google.charts.load('current', { 'packages': ['bar'] });

async function countClientsByCity() {
    try {
        const clientesSnapshot = await getDocs(clients);

        const clientsByCity = {};
        clientesSnapshot.forEach((clienteDoc) => {
            const clienteData = clienteDoc.data();
            const clienteCidade = clienteData.cidade.toLowerCase().trim();

            clientsByCity[clienteCidade] = (clientsByCity[clienteCidade] || 0) + 1;
        });

        console.log("Clients por Cidade (final):", clientsByCity);
        return clientsByCity;
    } catch (error) {
        console.error("Erro ao obter documentos do Firestore:", error);
        return null;
    }
}

async function generateChart() {
    const clientsByCity = await countClientsByCity();
    if (clientsByCity) {
        const data = [];
        for (const city in clientsByCity) {
            data.push([city, clientsByCity[city]]);
        }

        data.unshift(['Cidade', 'Clientes']);
        drawChart(data);
    } else {
        console.log("Nenhuma cidade encontrada.");
    }
}

function drawChart(data) {
    var data = google.visualization.arrayToDataTable(data);

    var options = {
        width: '100%',
        legend: { position: 'none' },
        chart: {
            title: 'Clientes por Cidade',
            subtitle: 'Número de Clientes por Cidade'
        },
        axes: {
            x: {
                0: { side: 'top', label: 'Cidade' }
            }
        },
        bar: { groupWidth: "90%" }
    };

    var chart = new google.charts.Bar(document.getElementById('chart_div'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

generateChart();
