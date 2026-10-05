// ==========================================================================
// SISTEMA DE NAVEGAÇÃO DO DECK DE SLIDES - CALLBACK FUNCTIONS
// ==========================================================================

let activeIndex = 0;
const allSlides = document.querySelectorAll('.slide-container');
const counterLabel = document.getElementById('slide-num');

function renderPresentation() {
    allSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === activeIndex);
    });
    counterLabel.innerText = `${activeIndex + 1} / ${allSlides.length}`;
}

function moveSlide(step) {
    const target = activeIndex + step;
    if (target >= 0 && target < allSlides.length) {
        activeIndex = target;
        renderPresentation();
    }
}

function nextSlide() { moveSlide(1); }
function prevSlide() { moveSlide(-1); }

// Eventos do teclado do laboratório (Setas e Barra de Espaço)
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault(); // Evita rolagem na tela
        moveSlide(1);
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveSlide(-1);
    }
});

// Inicialização imediata
renderPresentation();