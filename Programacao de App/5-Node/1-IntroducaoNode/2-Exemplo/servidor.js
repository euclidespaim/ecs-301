const http = require('http');

// Cria a inteligência do servidor
const servidor = http.createServer((req, res) => {
    res.end('Servidor do Professor Euclides rodando com sucesso! 🚀');
});

// Liga o servidor na porta 8081
servidor.listen(8081, () => {
    console.log('Servidor ativo em http://localhost:8081');
});