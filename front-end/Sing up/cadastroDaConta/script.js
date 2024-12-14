const API_URL = "http://localhost:8000";

// Função para cadastrar usuário
async function registerUser() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  if (!usuario || !password) {
    alert("Por favor, preencha todos os campos!");
    return;
  }
  try {
    const response = await fetch(`${API_URL}/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, password }),
    });

    const data = await response.json();
    alert(data.mensagem);

    // Redirecionar para index2.html após o cadastro
    if (response.ok) {
      window.location.href = "../../Sing in/loja/index.html"
    }
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    alert("Erro ao cadastrar usuário.");
  }
}