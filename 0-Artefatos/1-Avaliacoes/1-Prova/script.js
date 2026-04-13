const nome = document.getElementById("nome-usuario")
const dashboard = document.getElementById("dashboard")
const info = document.getElementById("info-moeda")
const cotacao = document.getElementById("cotacao")

nome.innerHTML = minhaCarteira.usuario

dashboard.innerHTML = minhaCarteira.prepararCard(0)
dashboard.innerHTML += minhaCarteira.prepararCard(1)
dashboard.innerHTML += minhaCarteira.prepararCard(2)
dashboard.innerHTML += minhaCarteira.prepararCard(3)
dashboard.innerHTML += minhaCarteira.prepararCard(4)

info.innerHTML = minhaCarteira.moedaBase
cotacao.innerHTML = minhaCarteira.cotacaoDolar
