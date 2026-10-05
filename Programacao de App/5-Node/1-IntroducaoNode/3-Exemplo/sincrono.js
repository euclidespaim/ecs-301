const fs = require('fs');

console.log("1. Fazer o pedido");

// O código TRAVA aqui até ler o arquivo todo
const lanche = fs.readFileSync('pedido.txt', 'utf-8');

console.log("2. Comer: \n" + lanche);

console.log("3. Atender próximo cliente");