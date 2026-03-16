const perfil = {
    nome: "Euclides",
    bio: "Professor de Tecnologia",
    seguidores: 100,

    //Método que utiliza o this para acessar as propriedades do próprio objeto 
    seguir() {
        this.seguidores++;
        console.log(`Novo seguidor! Agora você tem ${this.seguidores}.`)
    }
}

