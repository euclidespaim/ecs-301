/**
 * API Helper - Central de Operações CRUD
 * Este arquivo contém as funções básicas para realizar requisições HTTP
 * de forma simples e direta, ideal para testes rápidos no console do navegador (F12).
 */

// URL Base da nossa API local (JSON Server)
const API_URL = 'http://localhost:3000/usuarios';

// === [READ] GET - Listar todos os usuários ===
function listarUsuarios() {
  fetch(API_URL)
    .then(resposta => resposta.json())
    .then(dados => {
      console.log("=== LISTA DE USUÁRIOS ===");
      console.table(dados); // Exibe os dados em formato de tabela no console!
    });
}

// === [CREATE] POST - Cadastrar um novo usuário ===
function cadastrarUsuario(nome, cargo) {
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: nome, cargo: cargo })
  })
  .then(resposta => resposta.json())
  .then(usuarioCriado => {
    console.log("✅ Usuário cadastrado com sucesso!");
    console.log(usuarioCriado);
  });
}

// === [UPDATE] PATCH - Atualizar o cargo de um usuário pelo ID ===
function editarUsuario(id, novoCargo) {
  fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cargo: novoCargo })
  })
  .then(resposta => resposta.json())
  .then(usuarioAtualizado => {
    console.log(`✅ Usuário ${id} atualizado com sucesso!`);
    console.log(usuarioAtualizado);
  });
}

// === [DELETE] DELETE - Remover um usuário pelo ID ===
function removerUsuario(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    console.log(`✅ Usuário ${id} excluído com sucesso!`);
  });
}
