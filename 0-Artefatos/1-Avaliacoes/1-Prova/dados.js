const minhaCarteira = {
    usuario: "Investidor(a) 301",
    moedaBase: "BRL (R$)",
    cotacaoDolar: 5.15,
    
    ativos: [
        { nome: "Bitcoin", simbolo: "BTC", quantidade: 0.05, precoDolar: 65000 },
        { nome: "Ethereum", simbolo: "ETH", quantidade: 1.2, precoDolar: 3500 },
        { nome: "Solana", simbolo: "SOL", quantidade: 15.0, precoDolar: 150 },
        { nome: "Cardano", simbolo: "ADA", quantidade: 500.0, precoDolar: 0.45 },
        { nome: "Polkadot", simbolo: "DOT", quantidade: 80.0, precoDolar: 7.20 }
    ],

    prepararCard(indice) {
        const item = this.ativos[indice];
        const valorReais = item.quantidade * item.precoDolar * this.cotacaoDolar;
        
        return `
            <div class="card">
                <span class="simbolo">${item.simbolo}</span>
                <h3>${item.nome}</h3>
                <p>Qtd: ${item.quantidade}</p>
                <span class="valor">R$ ${valorReais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
        `;
    }
};