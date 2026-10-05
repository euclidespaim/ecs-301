    // Captura todos os blocos de slide na página
const slides = document.querySelectorAll('.slide');
const counterDisplay = document.getElementById('slide-counter');
let currentSlideIndex = 0;

// Atualiza a visualização com base no índice atual
function updateSlides() {
    slides.forEach((slide, index) => {
        if (index === currentSlideIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Atualiza o contador numérico inferior
    counterDisplay.innerText = `${currentSlideIndex + 1} / ${slides.length}`;
}

// Controla o avanço ou recuo do índice
function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;
    
    // Bloqueia caso tente ir além do primeiro ou do último slide
    if (newIndex >= 0 && newIndex < slides.length) {
        currentSlideIndex = newIndex;
        updateSlides();
    }
}

// Ouvinte de eventos de teclado (Navegação profissional por teclado)
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        // Seta para a direita ou Barra de Espaço avança
        event.preventDefault(); // Impede scroll indesejado com a barra de espaço
        changeSlide(1);
    } else if (event.key === 'ArrowLeft') {
        // Seta para a esquerda recua
        changeSlide(-1);
    }
});

// Inicializa o contador na primeira execução
updateSlides();