// [PARTE 1] CARREGAR O WEB COMPONENT NA APLICAÇÃO
// Cria um elemento <script> e configure seu atributo src
const scriptElement = document.createElement("script");
scriptElement.src = "http://localhost:3000/static/js/main.js";

// Cria um elemento <r2w-modal>
const r2wcModalElement = document.createElement("r2wc-modal2");

// Acessa o elemento <body> da página
const bodyElement = document.body;

// Adiciona o elemento <script> e o elemento <r2w-modal> ao <body>
bodyElement.appendChild(scriptElement);
bodyElement.appendChild(r2wcModalElement);

// [PARTE 2] ABRIR OU FECHAR O COMPONENTE
const loginButton = document.getElementById("portal-header-user-signin");

// Manipulador de evento de clique para abrir/fechar o componente
loginButton?.addEventListener("click", () => {
  window.clickModal();
});

// [PARTE 3] Verifica se o usuário está autenticado
window.addEventListener("userLoggedIn", (event) => {
  const { isAuthenticated } = event.detail;

  if (isAuthenticated) {
    // O usuário está autenticado, faça o que for necessário
    console.log("O usuário está autenticado.");
  } else {
    // O usuário não está autenticado, faça o que for necessário
    console.log("O usuário não está autenticado.");
  }
});
