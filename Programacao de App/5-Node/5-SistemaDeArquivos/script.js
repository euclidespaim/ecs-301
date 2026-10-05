// ==========================================================================
// SISTEMA DE NAVEGAÇÃO DO DECK DE SLIDES - FILE SYSTEM
// ==========================================================================

let activeIndex = 0;

// Captura estática dos elementos estruturais da view
const allSlides = document.querySelectorAll('.slide-container');
const counterLabel = document.getElementById('slide-num');

/**
 * Sincroniza a classe ativa dos slides e atualiza a numeração do rodapé
 */
function renderPresentation() {
    allSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === activeIndex);
    });

    // Modifica a string contadora (Ex: "1 / 14")
    counterLabel.innerText = `${activeIndex + 1} / ${allSlides.length}`;
}

/**
 * Executa a mudança segura do índice dos slides
 * @param {number} step - Passos a avançar (1) ou recuar (-1)
 */
function moveSlide(step) {
    const target = activeIndex + step;

    // Impede estouro das barreiras físicas do deck
    if (target >= 0 && target < allSlides.length) {
        activeIndex = target;
        renderPresentation();
    }
}

// Funções globais vinculadas diretamente ao clique dos botões HTML
function nextSlide() { moveSlide(1); }
function prevSlide() { moveSlide(-1); }

/**
 * Escuta nativa das interações físicas de teclado do laboratório
 */
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault(); // Retém o comportamento padrão de rolagem
        moveSlide(1);
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveSlide(-1);
    }
});

// Inicialização da view
renderPresentation();