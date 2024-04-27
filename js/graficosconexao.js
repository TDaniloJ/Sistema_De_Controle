// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5NFLOufex7Gylqd4RSE7V8icYXQqh93Y",
  authDomain: "sistema-de-controle-5bc09.firebaseapp.com",
  databaseURL: "https://sistema-de-controle-5bc09-default-rtdb.firebaseio.com",
  projectId: "sistema-de-controle-5bc09",
  storageBucket: "sistema-de-controle-5bc09.appspot.com",
  messagingSenderId: "53243518833",
  appId: "1:53243518833:web:084cafc5d7e72d80e7e0d0"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const clientsRef = db.collection('clientes');

const citiesRef = db.collection('cidades');

let clientsByCity = {};

citiesRef.get().then((snapshot) => {
    snapshot.forEach((citySnapshot) => {
        const cityName = citySnapshot.id; 
        const cityData = citySnapshot.data(); 

        console.log(cityName, cityData);
        
    });
});

clientsRef.get().then((snapshot) => {
    snapshot.forEach((clientSnapshot) => {
        const clientData = clientSnapshot.data();
        const city = clientData.cidade; 
        
        if (city) {
            if (clientsByCity[city]) {
                clientsByCity[city]++;
            } else {
                clientsByCity[city] = 1;
            }
        }
    });

    citiesRef.get().then((snapshot) => {
        snapshot.forEach((citySnapshot) => {
            const cityName = citySnapshot.id;
            if (!clientsByCity[cityName]) {
                clientsByCity[cityName] = 0;
            }
        });

        const labels = Object.keys(clientsByCity);
        const chartData = Object.values(clientsByCity);
        console.log(labels);
        console.log(chartData);

        const ctx = document.getElementById("chart").getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['teste'], //labels
                datasets: [{
                    label: 'Clientes',
                    backgroundColor: 'rgba(161, 198, 247, 1)',
                    borderColor: 'rgb(47, 128, 237)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgb(47, 128, 237)',
                    hoverBorderColor: 'rgb(47, 128, 237)',
                    data: [20], //chartData
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
    });
});
