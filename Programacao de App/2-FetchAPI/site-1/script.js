

const botao = document.querySelector('#btn');
const imagem = document.querySelector('#foto');

botao.addEventListener('click', () => {
    
    // 1. Faz a requisição
    fetch('https://dog.ceo/api/breeds/image/random')
        
    
        .then(res => res.json())
        // 3. ENTÃO aplica o link na imagem
        .then(data => {

            console.log(data);

            imagem.src = data.message;
            imagem.style.display = 'inline';
        });

});