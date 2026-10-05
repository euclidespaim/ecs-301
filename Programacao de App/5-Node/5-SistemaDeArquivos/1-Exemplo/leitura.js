const fs = require('fs');

// Dispara a leitura no HD de forma assíncrona
fs.readFile('pedido.txt', 'utf-8', (err, conteudo) => {
    if (err) {
        return console.log("🚨 Erro ao ler o arquivo: " + err.message);
    }
    console.log("\n📂 Conteúdo do Pedido: \n \n" + conteudo + "\n");
});