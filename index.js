import { exportDocs } from "./firebase.js";

const loginButton = document.getElementById("btn-login");
const emailInput = document.getElementById("floatingInput");
const passwordInput = document.getElementById("floatingPassword");

loginButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const querySnapshot = await exportDocs();
    const user = querySnapshot.docs.find(doc => 
      doc.exists && doc.data().email === email && doc.data().senha === password
    );

    if (user) {
      const isAdmin = user.data().admin;
      if (isAdmin) {
        alert("Login de administrador bem-sucedido!");
        window.location.href = "dashboardAdmin.html";
      } else {
        alert("Login de usuário comum bem-sucedido!");
        window.location.href = "dashboard.html";
      }
    } else {
      alert("Usuário ou senha incorretos!");
    }
  } catch (error) {
    console.error("Ocorreu um erro ao fazer login:", error);
    alert("Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.");
  }
});
