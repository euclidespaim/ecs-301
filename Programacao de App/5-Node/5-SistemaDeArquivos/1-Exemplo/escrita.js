const fs = require('fs');

const conteudo = "Jogador: Gabriel_301\\nPontuação: 9500 pontos\\nNível: Máster 🏆";

// Cria ou sobrescreve o arquivo 'highscore.txt'
fs.writeFile('highscore.txt', conteudo, 'utf-8', (err) => {
    if (err) {
        return console.log("🚨 Erro ao salvar o recorde: " + err.message);
    }
    console.log("💾 Arquivo salvo com sucesso na pasta do projeto!");
});