const objeto = {
    // Propriedades simples
    nomeTurma: "Turma 301",
    tituloAtividade: "Avaliação de Recuperação",
    nomeJogo: "Heroes of JS",

    herois: [
        { nome: "Ares", classe: "Guerreiro", forca: 80, foto: "img/heroi1.png" },
        { nome: "Athena", classe: "Estrategista", forca: 70, foto: "img/heroi2.png" },
        { nome: "Hermes", classe: "Velocista", forca: 60, foto: "img/heroi3.png" },
        { nome: "Hades", classe: "Sombrio", forca: 95, foto: "img/heroi4.png" }
    ],

    // MÉTODO 1: Retorna a parte superior (Imagem e Informações Básicas)
    obterDados(indice) {
        const h = this.herois[indice];
        return `
            <div class="moldura">
                <img src="${h.foto}" alt="${h.nome}">
            </div>
            <h3>${h.nome}</h3>
            <p>Classe: ${h.classe}</p>
            <p>Força Base: ${h.forca}</p>
        `;
    },

    // MÉTODO 2: Retorna apenas a linha de dano (Destaque visual)
    calcularDano(indice) {
        const h = this.herois[indice];
        const danoFinal = h.forca * 1.8;
        return `<div class="dano-texto">Dano de Ataque: ${danoFinal.toFixed(0)} XP</div>`;
    }
};