// ==========================================================================
// SISTEMA DE NAVEGAÇÃO DO DECK DE SLIDES MODULAR
// ==========================================================================

let currentSlideIndex = 0;

// Elementos de controle armazenados em cache estático
const totalSlides = document.querySelectorAll('.slide-container');
const numericCounter = document.getElementById('slide-num');

/**
 * Atualiza o estado visual das classes e modifica o contador numérico
 */
function syncSlides() {
    totalSlides.forEach((slide, index) => {
        if (index === currentSlideIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Renderiza a string do rodapé (Ex: "5 / 14")
    numericCounter.innerText = `${currentSlideIndex + 1} / ${totalSlides.length}`;
}

/**
 * Altera o índice e invoca a renderização se a movimentação for válida
 * @param {number} step - Passos positivos (avançar) ou negativos (recuar)
 */
function navigate(step) {
    const targetIndex = currentSlideIndex + step;

    // Garante que o usuário não ultrapasse as barreiras das extremidades
    if (targetIndex >= 0 && targetIndex < totalSlides.length) {
        currentSlideIndex = targetIndex;
        syncSlides();
    }
}

// Funções expostas de forma global para os cliques nos botões do HTML
function nextSlide() { navigate(1); }
function prevSlide() { navigate(-1); }

/**
 * Ouvinte Global de Teclado para Controle de Apresentação
 */
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
        case ' ': // Barra de espaço
            event.preventDefault(); // Retém o scroll do navegador
            navigate(1);
            break;
        case 'ArrowLeft':
            event.preventDefault();
            navigate(-1);
            break;
        default:
            break;
    }
});

// Inicialização imediata
syncSlides();