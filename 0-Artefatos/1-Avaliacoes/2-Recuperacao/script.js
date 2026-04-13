const turma = document.getElementById("turma")
const atividade = document.getElementById("atividade")
const jogo = document.getElementById("jogo")
const container = document.getElementById("container")

turma.innerHTML = objeto.nomeTurma
atividade.innerHTML = objeto.tituloAtividade
jogo.innerHTML = objeto.nomeJogo

container.innerHTML = `
    <div class="card-heroi">
        ${objeto.obterDados(0)}
        ${objeto.calcularDano(0)}
    </div>
`

container.innerHTML += `
    <div class="card-heroi">
        ${objeto.obterDados(1)}
        ${objeto.calcularDano(1)}
    </div>
`
container.innerHTML += `
    <div class="card-heroi">
        ${objeto.obterDados(2)}
        ${objeto.calcularDano(2)}
    </div>
`

container.innerHTML += `
    <div class="card-heroi">
        ${objeto.obterDados(3)}
        ${objeto.calcularDano(3)}
    </div>
`