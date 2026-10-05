import { playBeep } from './sound.js';

export function initAccordion() {
  const groups = document.querySelectorAll('.class-accordion-group');
  
  groups.forEach(group => {
    const header = group.querySelector('.accordion-header');
    if (!header) return;
    
    header.addEventListener('click', (e) => {
      // Prevent accordion collapse when clicking inside the expanded body
      if (e.target.closest('.accordion-body')) return;
      
      const isExpanded = group.classList.contains('expanded');
      
      // Collapse all other accordion groups
      groups.forEach(g => {
        if (g !== group) {
          g.classList.remove('expanded');
        }
      });
      
      // Toggle current accordion folder
      group.classList.toggle('expanded', !isExpanded);
      playBeep('click');
    });
  });
}

export function initNavigation() {
  const buttons = document.querySelectorAll('.mission-btn');
  const sections = document.querySelectorAll('.content-section');
  const groups = document.querySelectorAll('.class-accordion-group');
  
  const savedTab = localStorage.getItem('activeTab') || 'aula1-mod1';
  
  function activateTab(sectionId) {
    buttons.forEach(b => {
      b.classList.remove('active');
      if (b.getAttribute('data-section') === sectionId) {
        b.classList.add('active');
        
        // Find parent accordion group and auto-expand it
        const parentGroup = b.closest('.class-accordion-group');
        if (parentGroup && !parentGroup.classList.contains('expanded')) {
          groups.forEach(g => g.classList.remove('expanded'));
          parentGroup.classList.add('expanded');
        }
      }
    });
    
    sections.forEach(sec => {
      sec.classList.remove('active');
      if (sec.id === sectionId) {
        sec.classList.add('active');
      }
    });
    
    localStorage.setItem('activeTab', sectionId);
    
    // Update labels inside the buttons
    buttons.forEach(b => {
      const label = b.querySelector('.mission-status-label');
      if (label) {
        if (b.classList.contains('completed')) {
          label.textContent = 'Concluído';
        } else if (b.classList.contains('active')) {
          label.textContent = 'Em andamento';
        } else {
          label.textContent = 'Pendente';
        }
      }
    });

    // Notify other components that active navigation tab has changed
    window.dispatchEvent(new CustomEvent('state-changed'));
  }
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.getAttribute('data-section');
      activateTab(sectionId);
      playBeep('tab');
    });
  });
  
  // Restore initial active tab on page load
  activateTab(savedTab);
}

export function initTerminalSimulator() {
  const btnNode = document.getElementById('btn-sim-node');
  const btnNpm = document.getElementById('btn-sim-npm');
  const btnClear = document.getElementById('btn-sim-clear');
  const outputArea = document.getElementById('sanity-terminal-output');
  
  if (!outputArea) return;
  
  let typingInProgress = false;
  
  const commands = {
    'node -v': 'v20.11.0',
    'npm -v': '10.2.4'
  };
  
  function printCommand(commandText, outputText) {
    if (typingInProgress) return;
    typingInProgress = true;
    
    playBeep('click');
    
    const commandLine = document.createElement('div');
    commandLine.className = 'sim-line';
    commandLine.innerHTML = `
      <span class="sim-prompt">$</span>
      <span class="sim-input"></span>
    `;
    outputArea.appendChild(commandLine);
    
    const inputSpan = commandLine.querySelector('.sim-input');
    let index = 0;
    
    const typingTimer = setInterval(() => {
      if (index < commandText.length) {
        inputSpan.textContent += commandText.charAt(index);
        index++;
        playBeep('click');
      } else {
        clearInterval(typingTimer);
        
        setTimeout(() => {
          const outputLine = document.createElement('div');
          outputLine.className = 'sim-output';
          outputLine.textContent = outputText;
          outputArea.appendChild(outputLine);
          
          const readyLine = document.createElement('div');
          readyLine.className = 'sim-line';
          readyLine.innerHTML = `<span class="sim-prompt">$</span>`;
          outputArea.appendChild(readyLine);
          
          outputArea.scrollTop = outputArea.scrollHeight;
          
          playBeep('success');
          typingInProgress = false;
        }, 150);
      }
    }, 60);
  }
  
  if (btnNode) {
    btnNode.addEventListener('click', () => {
      printCommand('node -v', commands['node -v']);
    });
  }
  
  if (btnNpm) {
    btnNpm.addEventListener('click', () => {
      printCommand('npm -v', commands['npm -v']);
    });
  }
  
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (typingInProgress) return;
      playBeep('click');
      outputArea.innerHTML = `
        <div class="sim-line">
          <span class="sim-prompt">$</span>
          <span class="sim-input"></span>
        </div>
      `;
    });
  }
}

export function initMetaphorSimulator() {
  const nodes = {
    salon: document.getElementById('node-salon'),
    waiter: document.getElementById('node-waiter'),
    kitchen: document.getElementById('node-kitchen')
  };
  const descBox = document.getElementById('metaphor-desc');
  const packet1 = document.getElementById('packet-1');
  const packet2 = document.getElementById('packet-2');
  
  if (!descBox) return;
  
  const descriptions = {
    frontend: "O CLIENTE (Frontend): Abre a página web e envia um pacote HTTP (Request) contendo dados estruturados em formato JSON ao clicar em algum botão de envio.",
    api: "A REQUISIÇÃO (Mensagem HTTP): Traciona os dados (Cabeçalhos e Payload) de forma assíncrona usando a Fetch API através de rotas/endpoints liberados pelo CORS.",
    backend: "O SERVIDOR (Backend): Processa a mensagem de rede recebida na porta 3000, valida a ação e salva as alterações em tempo real no arquivo de banco de dados JSON."
  };
  
  function clearHighlights() {
    Object.values(nodes).forEach(n => {
      if (n) n.classList.remove('highlighted');
    });
    if (packet1) packet1.style.animation = 'none';
    if (packet2) packet2.style.animation = 'none';
  }
  
  if (nodes.salon) {
    nodes.salon.addEventListener('click', () => {
      clearHighlights();
      nodes.salon.classList.add('highlighted');
      descBox.textContent = descriptions.frontend;
      playBeep('packet');
      
      if (packet1) packet1.style.animation = 'flowForward 0.6s linear forwards';
      
      setTimeout(() => {
        if (nodes.waiter) nodes.waiter.classList.add('highlighted');
        playBeep('click');
      }, 600);
    });
  }
  
  if (nodes.waiter) {
    nodes.waiter.addEventListener('click', () => {
      clearHighlights();
      nodes.waiter.classList.add('highlighted');
      descBox.textContent = descriptions.api;
      playBeep('packet');
      
      if (packet1) packet1.style.animation = 'flowForward 0.4s linear forwards';
      setTimeout(() => {
        if (packet2) packet2.style.animation = 'flowForward 0.4s linear forwards';
        if (nodes.kitchen) nodes.kitchen.classList.add('highlighted');
        playBeep('click');
        
        setTimeout(() => {
          if (packet2) packet2.style.animation = 'flowBackward 0.4s linear forwards';
          playBeep('packet');
          setTimeout(() => {
            if (packet1) packet1.style.animation = 'flowBackward 0.4s linear forwards';
            if (nodes.salon) nodes.salon.classList.add('highlighted');
            playBeep('success');
          }, 400);
        }, 600);
      }, 400);
    });
  }
  
  if (nodes.kitchen) {
    nodes.kitchen.addEventListener('click', () => {
      clearHighlights();
      nodes.kitchen.classList.add('highlighted');
      descBox.textContent = descriptions.backend;
      playBeep('packet');
      
      if (packet2) packet2.style.animation = 'flowBackward 0.6s linear forwards';
      
      setTimeout(() => {
        if (nodes.waiter) nodes.waiter.classList.add('highlighted');
        playBeep('click');
      }, 600);
    });
  }
}

export function initClipboardCopier() {
  const copyButtons = document.querySelectorAll('.btn-copy');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.getAttribute('data-clipboard');
      const codeElement = document.getElementById(codeId);
      
      if (codeElement) {
        navigator.clipboard.writeText(codeElement.innerText).then(() => {
          playBeep('success');
          
          const originalSpan = btn.querySelector('span');
          if (originalSpan) {
            const originalText = originalSpan.textContent;
            originalSpan.textContent = 'Copiado!';
            btn.style.color = 'var(--neon-green)';
            
            setTimeout(() => {
              originalSpan.textContent = originalText;
              btn.style.color = '';
            }, 1500);
          }
        }).catch(err => {
          console.error("Erro ao copiar: ", err);
          playBeep('error');
        });
      }
    });
  });
}

export function initThemeToggle() {
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  if (!btnThemeToggle) return;
  
  // Restore theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
  
  btnThemeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    playBeep('click');
  });
}

export function initQuiz() {
  const btnSubmit = document.getElementById('btn-submit-quiz');
  if (!btnSubmit) return;
  
  const feedback = document.getElementById('quiz-feedback');
  const checkbox = document.getElementById('check-quiz-completed');
  
  // Restore state on load if already completed
  if (checkbox && checkbox.checked) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = 'var(--neon-green)';
      feedback.innerHTML = '🎉 Quiz concluído com 100% de aproveitamento!';
    }
  }

  btnSubmit.addEventListener('click', () => {
    playBeep('click');
    
    const answers = {
      q1: 'B',
      q2: 'C',
      q3: 'B',
      q4: 'A'
    };
    
    let correctCount = 0;
    const totalQuestions = 4;
    
    // Reset borders
    const cards = document.querySelectorAll('[data-question]');
    cards.forEach(card => {
      card.style.borderColor = 'var(--border-color)';
    });
    
    let allAnswered = true;
    for (let i = 1; i <= totalQuestions; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (!selected) {
        allAnswered = false;
      }
    }
    
    if (!allAnswered) {
      if (feedback) {
        feedback.style.display = 'block';
        feedback.style.color = 'var(--neon-yellow)';
        feedback.innerHTML = '⚠️ Por favor, responda a todas as questões antes de verificar.';
      }
      playBeep('error');
      return;
    }
    
    for (let i = 1; i <= totalQuestions; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      const card = document.querySelector(`[data-question="${i}"]`);
      if (selected && selected.value === answers[`q${i}`]) {
        correctCount++;
        if (card) {
          card.style.borderColor = 'rgba(16, 185, 129, 0.4)'; // soft green
        }
      } else {
        if (card) {
          card.style.borderColor = 'rgba(244, 63, 94, 0.4)'; // soft red
        }
      }
    }
    
    if (feedback) {
      feedback.style.display = 'block';
      if (correctCount === totalQuestions) {
        feedback.style.color = 'var(--neon-green)';
        feedback.innerHTML = `🎉 Excelente! Você acertou todas as ${totalQuestions} questões!`;
        if (checkbox) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change'));
        }
        playBeep('complete');
      } else {
        feedback.style.color = 'var(--neon-red)';
        feedback.innerHTML = `❌ Resposta incorreta identificada. Você acertou ${correctCount} de ${totalQuestions} questões. Tente novamente!`;
        if (checkbox) {
          checkbox.checked = false;
          checkbox.dispatchEvent(new Event('change'));
        }
        playBeep('error');
      }
    }
  });
}
