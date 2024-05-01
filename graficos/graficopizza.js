import { clients } from "../firebase.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

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

async function drawChart() {
    const clientsByCity = await countClientsByCity();
    if (clientsByCity) {
        const data = [['Cidade', 'Clientes']];
        const cities = Object.keys(clientsByCity).sort(); // Obtém todas as cidades e ordena alfabeticamente
        const colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395'];
        const colorMap = {};

        cities.forEach((city, index) => {
            data.push([city, clientsByCity[city]]);
            colorMap[city] = colors[index % colors.length]; // Associa uma cor a cada cidade
        });

        var chartData = google.visualization.arrayToDataTable(data);

        var options = {
            title: 'Cidades com mais Clientes',
            is3D: true,
            slices: cities.map(city => ({ color: colorMap[city] })) // Usa as cores associadas a cada cidade
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(chartData, options);
    } else {
        console.log("Nenhuma cidade encontrada.");
    }
}

