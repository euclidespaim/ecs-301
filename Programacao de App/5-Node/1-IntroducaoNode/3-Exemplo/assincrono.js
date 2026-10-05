const fs = require('fs');

console.log("1. Fazer o pedido");

// Não trava! Dispara a leitura e vai para a linha 9
fs.readFile('pedido.txt', 'utf-8', (err, lanche) => {
    console.log("2. Buzzer vibrou! Comer: \n" + lanche);
});


console.log("3. Atender próximo cliente");