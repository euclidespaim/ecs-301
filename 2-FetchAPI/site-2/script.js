
const botao = document.querySelector('#btn');
const campoNome = document.querySelector('#nome');
const campoFoto = document.querySelector('#poke');

botao.addEventListener('click', () => {

    const id = Math.floor(Math.random() * 151) + 1;

    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // 3. Atualiza os dados na tela
            // 'data.name' é o nome, 'data.sprites.front_default' é a imagem
            campoNome.innerText = data.name.toUpperCase();
            campoFoto.src = data.sprites.front_default;
        });
});
