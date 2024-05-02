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

google.charts.load('current', { 'packages': ['bar', 'corechart'] });
google.charts.setOnLoadCallback(generateChart);

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
    const cities = data.slice(1).map(row => row[0]);
    const colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395'];

    const options = {
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
        bar: { groupWidth: "90%" },
        colors: cities.map((city, index) => colors[index % colors.length])
    };

    var chartData = google.visualization.arrayToDataTable(data);
    var chart = new google.charts.Bar(document.getElementById('chart_div'));
    chart.draw(chartData, google.charts.Bar.convertOptions(options));
}



generateChart();
