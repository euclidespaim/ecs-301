class SistemaAC  {
    constructor() {
        Object.seal(this); // Impede adição ou remoção de propriedades, mas permite alteração dos valores existentes
    }

    #temp = 22; // O # define um propriedade interna ES2022 (private field)

    // MISSÃO 1: Criar o SETTER 'temperatura(valor)'
    // Use if/else para validar o limite de 16 a 30.

    // MISSÃO 2: Criar o GETTER 'temperatura()'
    // Deve retornar o valor seguido da unidade "°C".
};

const arCondicionado = new SistemaAC();

// Lógica de Integração
function enviarComando() {
    const input = document.getElementById('input-usuario');
    const visor = document.getElementById('visor-temp');

    // Tenta atribuir via SETTER
    arCondicionado.temperatura = Number(input.value);

    // Lê o valor via GETTER e mostra na tela
    visor.innerText = arCondicionado.temperatura;
}