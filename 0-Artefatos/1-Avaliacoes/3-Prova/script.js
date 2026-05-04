class SistemaAC  {
    constructor() {
        Object.seal(this); // Impede adição ou remoção de propriedades, mas permite alteração dos valores existentes
    }

    #temp = 22; // O # define um propriedade interna ES2022 (private field)

    // MISSÃO 1: Criar o SETTER 'temperatura(valor)'
    // Use if/else para validar o limite de 16 a 30.

    // MISSÃO 1: O SETTER (O Filtro de Segurança)
    set temperatura(valor) {
        // Validação: Somente entre 16 e 30 graus
        if (valor >= 16 && valor <= 30) {
            this.#temp = valor;
        } else {
            alert("⚠️ Erro: Temperatura fora dos limites de segurança (16°C a 30°C)!");
        }
    }

    // MISSÃO 2: O GETTER (O Formatador do Visor)
    get temperatura() {
        // Devolve o dado real com a unidade de medida
        return this.#temp + "°C";
    }
    
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