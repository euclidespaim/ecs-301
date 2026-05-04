class ControleAudio {
    // 1. Atributo Privado (O "Cofre")
    #volume = 20;

    constructor() {
        // Impede a criação de propriedades "falsas" (O Lacre)
        Object.seal(this);
    }

    // MISSÃO 1: O SETTER 'volume(valor)'
    

    // MISSÃO 2: O GETTER 'volume'
    
}

// Instanciando o novo objeto
const sistemaSom = new ControleAudio();

// Função de Integração (chamada pelo seu botão no HTML)
function enviarComando() {
    const input = document.getElementById('input-volume');
    const visor = document.getElementById('visor-volume');

    // Tenta atribuir via SETTER
    sistemaSom.volume = Number(input.value);

    // Lê via GETTER
    visor.innerText = sistemaSom.volume;
}