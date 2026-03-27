function atualizarInfoGeral() {
    document.getElementById('nome').innerText = sistemaLab.nome;
    document.getElementById('resp').innerText = `Responsável: ${sistemaLab.responsavel}`;
    
    document.getElementById('total').innerText = "Total de equipamentos no Lab: " + sistemaLab.contarEquipamentos();
}

atualizarInfoGeral()