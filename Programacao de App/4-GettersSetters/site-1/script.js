const heroi = {
    nome: "King Arthur",
    _hp: 100, // Usamos o _ para indicar que é uma 
    // propriedade interna

    // O porteiro: valida o que entra
    set hp(valor) {
        if (valor < 0) {
            console.warn("⚠️ Valor inválido! O HP não pode ser negativo. Ajustando para 0.");
            this._hp = 0;
        } else {
            this._hp = valor;
        }
    },

    // O visor: controla o que sai
    get hp() {
        return `💖 ${this._hp} HP`;
    }
};

// Teste no console:
heroi.hp = 50;   // Funciona normal
heroi.hp = -20;  // O Setter vai barrar e ajustar para 0
console.log(heroi.hp);