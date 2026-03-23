const perfil = {
    avatar: "./img.jpg",
    nome: "Rodolfo",
    bio: "Desenvolvedor Web",
    seguidores: 100,

    seguir() { 
        this.seguidores++;
        console.log(`Novo seguidor!! Agora você tem ${this.seguidores}.`)
    }
}

//Referências para o DOM
const nome = document.getElementById("nome");
const bio = document.getElementById("bio");
const foto = document.getElementById("avatar");
const contagem = document.getElementById("contagem");
const btn = document.getElementById("btn-seguir");


//Função para renderizar os dados
function atualizarPerfil(){
    nome.innerText = perfil.nome
    bio.innerText = perfil.bio
    foto.src = perfil.avatar
    contagem.innerText = perfil.seguidores
}

btn.addEventListener('click', () => {
    perfil.seguir()
    atualizarPerfil()
})

atualizarPerfil()