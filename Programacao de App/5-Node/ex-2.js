// Exemplo de execução assíncrona
console.log("1. Usuário solicita os dados.");

// Simula uma tarefa que leva 2 segundos (como uma consulta ao banco)
setTimeout(() => {
    console.log("3. Dados prontos (após 3 segundos)!");
}, 3000);

console.log("2. O sistema continua rodando outras tarefas enquanto espera...");