// ==========================================================================
// SISTEMA DE NAVEGAÇÃO INTERATIVA - AULA RESEND
// ==========================================================================

let activeSlideIndex = 0;

// Cache dos elementos para performance
const slides = document.querySelectorAll('.slide-container');
const counter = document.getElementById('slide-num');

/**
 * Atualiza a visibilidade dos slides e a numeração do rodapé
 */
function updateView() {
    slides.forEach((slide, index) => {
        if (index === activeSlideIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Renderiza a contagem (Ex: "3 / 14")
    counter.innerText = `${activeSlideIndex + 1} / ${slides.length}`;
}

/**
 * Altera o índice do slide com proteção de limites
 * @param {number} direction - 1 para frente, -1 para trás
 */
function navigate(direction) {
    const nextIndex = activeSlideIndex + direction;

    if (nextIndex >= 0 && nextIndex < slides.length) {
        activeSlideIndex = nextIndex;
        updateView();
    }
}

// Vincula funções aos botões de clique
function nextSlide() { navigate(1); }
function prevSlide() { navigate(-1); }

/**
 * Escuta teclas físicas para navegação profissional (Setas e Espaço)
 */
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
        case ' ': // Barra de Espaço
            event.preventDefault(); // Retém rolagem da página
            navigate(1);
            break;
        case 'ArrowLeft':
            navigate(-1);
            break;
    }
});

// Inicialização imediata ao carregar a página
updateView();