// ==========================================================================
// SISTEMA DE NAVEGAÇÃO INTERATIVA DO DECK DE SLIDES - NPM
// ==========================================================================

let activeIndex = 0;

// Mapeamento em cache estático dos elementos estruturais do DOM
const allSlides = document.querySelectorAll('.slide-container');
const counterLabel = document.getElementById('slide-num');

/**
 * Sincroniza o estado de visibilidade dos slides e atualiza a paginação
 */
function renderPresentation() {
    allSlides.forEach((slide, index) => {
        if (index === activeIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Atualiza a string contadora no canto inferior direito (Ex: "1 / 14")
    counterLabel.innerText = `${activeIndex + 1} / ${allSlides.length}`;
}

/**
 * Efetua a alteração segura do índice de navegação
 * @param {number} step - Passos a avançar (1) ou recuar (-1)
 */
function moveSlide(step) {
    const target = activeIndex + step;

    // Impede o transbordo das fronteiras dos slides disponíveis
    if (target >= 0 && target < allSlides.length) {
        activeIndex = target;
        renderPresentation();
    }
}

// Vinculação global das ações para cliques em botões de interface
function nextSlide() { moveSlide(1); }
function prevSlide() { moveSlide(-1); }

/**
 * Intercetor global de eventos físicos do teclado
 */
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
        case ' ': // Barra de Espaço
            event.preventDefault(); // Retém scroll indesejado da janela de visualização
            moveSlide(1);
            break;
        case 'ArrowLeft':
            event.preventDefault();
            moveSlide(-1);
            break;
        default:
            break;
    }
});

// Inicialização imediata do ciclo de vida da apresentação
renderPresentation();