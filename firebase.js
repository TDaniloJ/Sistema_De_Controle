
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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

 const db = getDatabase(app);

 document.getElementById("cadastrar").addEventListener('click', function(e) {
 set(ref(db, 'user/'+ document.getElementById("nome").value),
 {
     nome:  document.getElementById("nome").value,
     email: document.getElementById("email").value,
     datanascimento: document.getElementById("datanascimento").value,
     masculino: document.getElementById(" masculino").value,


 })
 alert ("login sucessfull !")
 })


   