const os = require('os');

console.log("Plataforma: ", os.platform())
console.log("Arquitetura: ", os.arch())
console.log("Memória RAM Livre: ", os.freemem())