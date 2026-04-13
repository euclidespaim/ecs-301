function atualizarInfoGeral() {
    document.getElementById('nome').innerText = sistemaLab.nome;
    document.getElementById('resp').innerText = `Responsável: ${sistemaLab.responsavel}`;
    document.getElementById('escola').innerText = `Escola: ${sistemaLab.escola}`
    document.getElementById('total').innerText = `Total de equipamentos no lab: ${sistemaLab.contarEquipamentos()}`
}

function redenrizarLista(){
    const cartao = document.getElementById('cartao');
    cartao.innerHTML = "";

    sistemaLab.equipamentos.forEach( item => {

        const saude = sistemaLab.verificarSaude(item.horasUso)

        cartao.innerHTML += `
            <div class="container">
                <h3>${item.tipo}</h3>
                <p>Marca: ${item.marca}</p>
                <p>Uso: ${item.horasUso}</p>
                <span class="status">${saude}</span>
            </div>
        `
    })
}

redenrizarLista()
atualizarInfoGeral()