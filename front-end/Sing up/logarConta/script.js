const API_URL = "http://localhost:8000";

// Função para fazer login do usuário
async function loginUser() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  if (!usuario || !password) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login bem-sucedido!"); 
    } else {
      alert(data.erro || "Erro ao fazer login."); 
    }

    if (response.ok) {
      window.location.href = "../../Sing in/loja/index.html";
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Erro ao fazer login.");
  }
}