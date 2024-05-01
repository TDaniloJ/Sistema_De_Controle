import { exportUsers } from "./firebase.js";

const loginButton = document.getElementById("login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const querySnapshot = await exportUsers();
    const user = querySnapshot.docs.find(doc => 
      doc.exists && doc.data().email === email && doc.data().senha === password
    );

    if (user) {
      const isAdmin = user.data().admin;
      if (isAdmin) {
        alert("Login de administrador bem-sucedido!");
        window.location.href = "./dashboard-admin/index.html";
      } else {
        alert("Login de usuário comum bem-sucedido!");
        window.location.href = "./dashboard-user/index.html";
      }
    } else {
      alert("Usuário ou senha incorretos!");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao fazer login:", error);
    alert("Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.");
  }
});
