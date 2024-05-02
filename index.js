import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { app, auth } from "./firebase.js";

const firestore = getFirestore(app);

const loginButton = document.getElementById("login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    // Autentica o usuário usando o Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Verifica se o usuário é um administrador usando o Firestore
    const usersCollection = collection(firestore, "usuarios");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const isAdmin = querySnapshot.docs[0].data().admin;
      if (isAdmin) {
        alert("Login de administrador bem-sucedido!");
        window.location.href = "./dashboard-admin/index.html";
      } else {
        alert("Login de usuário comum bem-sucedido!");
        window.location.href = "./dashboard-user/index.html";
      }
    } else {
      alert("Usuário não encontrado no banco de dados!");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao fazer login:", error);
    alert("Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.");
  }
});
