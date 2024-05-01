import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD5NFLOufex7Gylqd4RSE7V8icYXQqh93Y",
    authDomain: "sistema-de-controle-5bc09.firebaseapp.com",
    databaseURL: "https://sistema-de-controle-5bc09-default-rtdb.firebaseio.com",
    projectId: "sistema-de-controle-5bc09",
    storageBucket: "sistema-de-controle-5bc09.appspot.com",
    messagingSenderId: "53243518833",
    appId: "1:53243518833:web:084cafc5d7e72d80e7e0d0"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const estadosCollection = collection(firestore, "estado");
export const clientesCollection = collection(firestore, "clientes");

export async function exportDocs() {
    const querySnapshotEstados = await getDocs(estadosCollection);
    const querySnapshotClientes = await getDocs(clientesCollection);
  
    return {
        estados: querySnapshotEstados,
        clientes: querySnapshotClientes
    };
}
