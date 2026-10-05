import { playBeep } from './sound.js';
import { API_URL, PASSWORDS } from './config.js';

export function initEvaluationSystem() {
  const btnUnlock = document.getElementById('btn-unlock-avaliacao');
  const keyInput = document.getElementById('avaliacao-key-input');
  const gateError = document.getElementById('avaliacao-gate-error');
  const lockedView = document.getElementById('avaliacao-locked-view');
  const unlockedView = document.getElementById('avaliacao-unlocked-view');
  
  if (!btnUnlock) return;
  
  const folder = document.getElementById('folder-avaliacao');
  const folderTitle = document.getElementById('accordion-title-avaliacao');
  const folderBtnLabel = document.querySelector('#btn-avaliacao1 .mission-status-label');
  
  btnUnlock.addEventListener('click', attemptUnlock);
  if (keyInput) {
    keyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attemptUnlock();
    });
  }
  
  function attemptUnlock() {
    const key = keyInput.value.trim().toUpperCase();
    if (key === PASSWORDS.exam) {
      unlockEvaluation();
    } else {
      if (gateError) gateError.style.display = 'block';
      keyInput.value = '';
      keyInput.focus();
      playBeep('error');
    }
  }
  
  function unlockEvaluation() {
    if (lockedView) lockedView.style.display = 'none';
    if (unlockedView) unlockedView.style.display = 'block';
    
    if (folder) folder.classList.remove('locked');
    if (folderTitle) folderTitle.textContent = '🔓 Avaliação 01: Prova Prática';
    if (folderBtnLabel) folderBtnLabel.textContent = 'Pendente';
    
    localStorage.setItem('avaliacaoUnlocked', 'true');
    playBeep('success');
    
    window.dispatchEvent(new CustomEvent('state-changed'));
  }
  
  // Restore unlock state on load
  if (localStorage.getItem('avaliacaoUnlocked') === 'true') {
    if (lockedView) lockedView.style.display = 'none';
    if (unlockedView) unlockedView.style.display = 'block';
    if (folder) folder.classList.remove('locked');
    if (folderTitle) folderTitle.textContent = '🔓 Avaliação 01: Prova Prática';
    if (folderBtnLabel) folderBtnLabel.textContent = 'Pendente';
  }
  
  // Test suite execution
  // Test suite execution (Interactive Auditor State Machine)
  const btnRun = document.getElementById('btn-run-tests');
  const terminal = document.getElementById('validation-terminal-output');
  
  const check1 = document.getElementById('check-test-1');
  const check2 = document.getElementById('check-test-2');
  const check3 = document.getElementById('check-test-3');
  const check4 = document.getElementById('check-test-4');
  const check5 = document.getElementById('check-test-5');
  const check6 = document.getElementById('check-test-6');

  let currentAuditStep = 0;

  if (btnRun) {
    btnRun.addEventListener('click', handleButtonClick);
  }

  async function handleButtonClick() {
    if (btnRun.disabled) return;
    playBeep('click');
    
    if (currentAuditStep === 0) {
      currentAuditStep = 0;
      if (terminal) {
        terminal.innerHTML = `<div class="val-log-info">&gt; Iniciando auditoria interativa em ${API_URL}...</div>`;
      }
      
      const checks = [check1, check2, check3, check4, check5, check6];
      checks.forEach(c => {
        if (c) {
          c.checked = false;
          c.dispatchEvent(new Event('change'));
        }
      });
      
      appendLog('&gt; Resetando estado dos agentes locais para a configuração inicial...');
      try {
        await fetch(`${API_URL}/agentes/3`, { method: 'DELETE' });
      } catch (err) {}
      try {
        await fetch(`${API_URL}/agentes/2`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: "Trinity", status: "Oculto" })
        });
      } catch (err) {}
      
      btnRun.disabled = true;
      
      // Test 1: GET /agentes
      appendLog('&gt; [TESTE 1] Testando conexão e leitura inicial (GET /agentes)...');
      try {
        const res = await fetch(`${API_URL}/agentes`);
        if (res.status === 200) {
          const data = await res.json();
          if (Array.isArray(data) && data.length >= 2) {
            const hasNeo = data.some(ag => ag.nome && ag.nome.toLowerCase() === 'neo');
            const hasTrinity = data.some(ag => ag.nome && ag.nome.toLowerCase() === 'trinity');
            if (hasNeo && hasTrinity) {
              appendLog('  ↳ Resposta: HTTP 200 OK. Registros "Neo" e "Trinity" encontrados!', 'success');
              if (check1) {
                check1.checked = true;
                check1.dispatchEvent(new Event('change'));
              }
              playBeep('success');
              
              // Proceed to Step 2 instruction
              appendLog('\n&gt; [TESTE 2] Cadastro de Morpheus (POST)');
              appendLog('  ↳ <span style="color: var(--neon-cyan); font-weight: bold;">INSTRUÇÃO:</span> No seu arquivo local <code>app.js</code>, crie e execute uma requisição <strong>POST /agentes</strong> para cadastrar Morpheus.');
              appendLog('  ↳ <strong>Payload exigido:</strong> <code>{ "id": "3", "nome": "Morpheus", "status": "Procurado" }</code>');
              appendLog('  ↳ Quando seu fetch for executado localmente, clique no botão abaixo para validar a persistência.');
              
              btnRun.textContent = 'Validar POST (Morpheus)';
              btnRun.className = 'btn-primary btn-yellow';
              currentAuditStep = 1;
            } else {
              appendLog('  ↳ FALHA: Registros padrão "Neo" e "Trinity" não foram encontrados no banco.', 'fail');
            }
          } else {
            appendLog('  ↳ FALHA: A rota GET não retornou um array de agentes válido.', 'fail');
          }
        } else {
          appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}. Esperava 200.`, 'fail');
        }
      } catch (err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Certifique-se de que o json-server está ativo na porta 3000.', 'fail');
      }
      
      btnRun.disabled = false;
      
    } else if (currentAuditStep === 1) {
      btnRun.disabled = true;
      appendLog('&gt; [AUDITORIA TESTE 2] Verificando existência do Morpheus via GET /agentes/3...');
      try {
        const res = await fetch(`${API_URL}/agentes/3`);
        if (res.status === 200) {
          const data = await res.json();
          if (data && data.nome === 'Morpheus' && data.status === 'Procurado') {
            appendLog('  ↳ Resposta: HTTP 200 OK! Agente "Morpheus" cadastrado e persistido com sucesso!', 'success');
            if (check2) {
              check2.checked = true;
              check2.dispatchEvent(new Event('change'));
            }
            playBeep('success');
            
            // Proceed to Step 3 instruction
            appendLog('\n&gt; [TESTE 3] Sobrescrita completa da Trinity (PUT)');
            appendLog('  ↳ <span style="color: var(--neon-cyan); font-weight: bold;">INSTRUÇÃO:</span> No seu arquivo local, crie e execute um fetch com o método <strong>PUT /agentes/2</strong> para atualizar a Trinity.');
            appendLog('  ↳ <strong>Payload exigido:</strong> <code>{ "nome": "Trinity", "status": "Ativo" }</code>');
            appendLog('  ↳ Clique no botão abaixo para validar a persistência.');
            
            btnRun.textContent = 'Validar PUT (Trinity Ativo)';
            btnRun.className = 'btn-primary btn-cyan';
            currentAuditStep = 2;
          } else {
            appendLog('  ↳ FALHA: O recurso foi encontrado, mas os dados estão incorretos (Nome ou Status divergente).', 'fail');
          }
        } else {
          appendLog(`  ↳ FALHA: Rota GET /agentes/3 retornou status HTTP ${res.status}. Certifique-se de que seu código rodou e salvou os dados.`, 'fail');
        }
      } catch (err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao tentar conectar ao servidor local.', 'fail');
      }
      btnRun.disabled = false;
      
    } else if (currentAuditStep === 2) {
      btnRun.disabled = true;
      appendLog('&gt; [AUDITORIA TESTE 3] Verificando persistência do PUT via GET /agentes/2...');
      try {
        const res = await fetch(`${API_URL}/agentes/2`);
        if (res.status === 200) {
          const data = await res.json();
          if (data && data.nome === 'Trinity' && data.status === 'Ativo') {
            appendLog('  ↳ Resposta: HTTP 200 OK! Trinity atualizada para "Ativo" com sucesso!', 'success');
            if (check3) {
              check3.checked = true;
              check3.dispatchEvent(new Event('change'));
            }
            playBeep('success');
            
            // Proceed to Step 4 instruction
            appendLog('\n&gt; [TESTE 4] Edição Parcial da Trinity (PATCH)');
            appendLog('  ↳ <span style="color: var(--neon-cyan); font-weight: bold;">INSTRUÇÃO:</span> No seu arquivo local, execute uma chamada <strong>PATCH /agentes/2</strong> para mudar apenas o status para "Oculto".');
            appendLog('  ↳ <strong>Payload exigido:</strong> <code>{ "status": "Oculto" }</code> (Não inclua a propriedade "nome" para atestar a alteração parcial).');
            appendLog('  ↳ Clique no botão abaixo para validar.');
            
            btnRun.textContent = 'Validar PATCH (Trinity Oculto)';
            btnRun.className = 'btn-primary btn-purple';
            currentAuditStep = 3;
          } else {
            appendLog('  ↳ FALHA: Trinity ainda não possui o status "Ativo". Verifique se o seu PUT foi executado no db.json.', 'fail');
          }
        } else {
          appendLog(`  ↳ FALHA: GET /agentes/2 retornou HTTP ${res.status}.`, 'fail');
        }
      } catch (err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao tentar conectar ao servidor local.', 'fail');
      }
      btnRun.disabled = false;
      
    } else if (currentAuditStep === 3) {
      btnRun.disabled = true;
      appendLog('&gt; [AUDITORIA TESTE 4] Verificando persistência do PATCH via GET /agentes/2...');
      try {
        const res = await fetch(`${API_URL}/agentes/2`);
        if (res.status === 200) {
          const data = await res.json();
          if (data && data.status === 'Oculto' && data.nome === 'Trinity') {
            appendLog('  ↳ Resposta: HTTP 200 OK! PATCH validado. Status alterado para "Oculto" preservando o nome original!', 'success');
            if (check4) {
              check4.checked = true;
              check4.dispatchEvent(new Event('change'));
            }
            playBeep('success');
            
            // Proceed to Step 5 instruction
            appendLog('\n&gt; [TESTE 5] Exclusão do Agente de Testes (DELETE)');
            appendLog('  ↳ <span style="color: var(--neon-cyan); font-weight: bold;">INSTRUÇÃO:</span> No seu arquivo local, envie um fetch com método <strong>DELETE /agentes/3</strong> para remover Morpheus.');
            appendLog('  ↳ Clique no botão abaixo para verificar se o registro foi removido do db.json.');
            
            btnRun.textContent = 'Validar DELETE (Morpheus)';
            btnRun.className = 'btn-primary btn-red';
            currentAuditStep = 4;
          } else {
            appendLog('  ↳ FALHA: O status não mudou para "Oculto" ou o nome "Trinity" foi apagado/sobrescrito no PATCH.', 'fail');
          }
        } else {
          appendLog(`  ↳ FALHA: GET /agentes/2 retornou HTTP ${res.status}.`, 'fail');
        }
      } catch (err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao tentar conectar ao servidor local.', 'fail');
      }
      btnRun.disabled = false;
      
    } else if (currentAuditStep === 4) {
      btnRun.disabled = true;
      appendLog('&gt; [AUDITORIA TESTE 5] Verificando remoção do Morpheus via GET /agentes/3...');
      try {
        const res = await fetch(`${API_URL}/agentes/3`);
        if (res.status === 404 || res.status === 204 || res.status === 400) {
          appendLog('  ↳ Resposta: HTTP 404 Not Found. Exclusão de Morpheus atestada com sucesso!', 'success');
          if (check5) {
            check5.checked = true;
            check5.dispatchEvent(new Event('change'));
          }
          playBeep('success');
          
          // Proceed to Step 6 automatically
          appendLog('\n&gt; [TESTE 6] Inspeção CORS Preflight (OPTIONS /agentes)...');
          appendLog('  ↳ Enviando requisição OPTIONS automática para auditar suporte a cabeçalhos de preflight...');
          
          try {
            const optRes = await fetch(`${API_URL}/agentes`, { method: 'OPTIONS' });
            if (optRes.status === 200 || optRes.status === 204) {
              appendLog(`  ↳ Resposta: HTTP ${optRes.status}. O servidor aceita requisições OPTIONS/CORS com sucesso!`, 'success');
              if (check6) {
                check6.checked = true;
                check6.dispatchEvent(new Event('change'));
              }
              playBeep('success');
            } else {
              appendLog(`  ↳ FALHA: Chamada OPTIONS respondeu com HTTP ${optRes.status}. Esperava 200 ou 204.`, 'fail');
            }
          } catch (err) {
            appendLog('  ↳ ERRO DE CONEXÃO: Falha ao responder ao método OPTIONS (CORS preflight).', 'fail');
          }
          
          // Finish and show grade
          const checks = [check1, check2, check3, check4, check5, check6];
          const passedCount = checks.filter(c => c && c.checked).length;
          const gradeVal = ((passedCount / 6) * 10).toFixed(1);
          localStorage.setItem('avaliacaoGrade', `Nota: ${gradeVal} / 10.0`);
          
          if (passedCount === 6) {
            appendLog(`\n🎉 EXCELENTE! TODOS OS TESTES PASSARAM COM SUCESSO (6/6).\nNota final: ${gradeVal} / 10.0`, 'success');
            if (folderBtnLabel) folderBtnLabel.textContent = 'Concluído';
            const btnEval = document.getElementById('btn-avaliacao1');
            if (btnEval) btnEval.classList.add('completed');
            playBeep('complete');
          } else {
            appendLog(`\n❌ CONCLUÍDO COM PENDÊNCIAS: ${6 - passedCount} teste(s) não passaram.\nNota final: ${gradeVal} / 10.0`, 'fail');
            if (folderBtnLabel) folderBtnLabel.textContent = 'Pendente';
            const btnEval = document.getElementById('btn-avaliacao1');
            if (btnEval) btnEval.classList.remove('completed');
            playBeep('error');
          }
          
          window.dispatchEvent(new CustomEvent('state-changed'));
          
          btnRun.textContent = 'Reiniciar Auditoria';
          btnRun.className = 'btn-primary';
          currentAuditStep = 0;
          
        } else if (res.status === 200) {
          const data = await res.json();
          if (!data || Object.keys(data).length === 0 || data.id !== "3") {
            appendLog('  ↳ Resposta: Exclusão confirmada (Dados vazios/nulos)!', 'success');
            if (check5) {
              check5.checked = true;
              check5.dispatchEvent(new Event('change'));
            }
            playBeep('success');
            
            // Proceed to Step 6 automatically
            appendLog('\n&gt; [TESTE 6] Inspeção CORS Preflight (OPTIONS /agentes)...');
            appendLog('  ↳ Enviando requisição OPTIONS automática para auditar suporte a cabeçalhos de preflight...');
            
            try {
              const optRes = await fetch(`${API_URL}/agentes`, { method: 'OPTIONS' });
              if (optRes.status === 200 || optRes.status === 204) {
                appendLog(`  ↳ Resposta: HTTP ${optRes.status}. O servidor aceita requisições OPTIONS/CORS com sucesso!`, 'success');
                if (check6) {
                  check6.checked = true;
                  check6.dispatchEvent(new Event('change'));
                }
                playBeep('success');
              } else {
                appendLog(`  ↳ FALHA: Chamada OPTIONS respondeu com HTTP ${optRes.status}. Esperava 200 ou 204.`, 'fail');
              }
            } catch (err) {
              appendLog('  ↳ ERRO DE CONEXÃO: Falha ao responder ao método OPTIONS (CORS preflight).', 'fail');
            }
            
            // Finish and show grade
            const checks = [check1, check2, check3, check4, check5, check6];
            const passedCount = checks.filter(c => c && c.checked).length;
            const gradeVal = ((passedCount / 6) * 10).toFixed(1);
            localStorage.setItem('avaliacaoGrade', `Nota: ${gradeVal} / 10.0`);
            
            if (passedCount === 6) {
              appendLog(`\n🎉 EXCELENTE! TODOS OS TESTES PASSARAM COM SUCESSO (6/6).\nNota final: ${gradeVal} / 10.0`, 'success');
              if (folderBtnLabel) folderBtnLabel.textContent = 'Concluído';
              const btnEval = document.getElementById('btn-avaliacao1');
              if (btnEval) btnEval.classList.add('completed');
              playBeep('complete');
            } else {
              appendLog(`\n❌ CONCLUÍDO COM PENDÊNCIAS: ${6 - passedCount} teste(s) não passaram.\nNota final: ${gradeVal} / 10.0`, 'fail');
              if (folderBtnLabel) folderBtnLabel.textContent = 'Pendente';
              const btnEval = document.getElementById('btn-avaliacao1');
              if (btnEval) btnEval.classList.remove('completed');
              playBeep('error');
            }
            
            window.dispatchEvent(new CustomEvent('state-changed'));
            
            btnRun.textContent = 'Reiniciar Auditoria';
            btnRun.className = 'btn-primary';
            currentAuditStep = 0;
          } else {
            appendLog('  ↳ FALHA: Morpheus ainda consta no banco de dados local. Certifique-se de que executou a chamada DELETE.', 'fail');
          }
        } else {
          appendLog(`  ↳ FALHA: GET /agentes/3 retornou HTTP ${res.status}. Esperava 404 para exclusão física.`, 'fail');
        }
      } catch (err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao tentar conectar ao servidor local.', 'fail');
      }
      btnRun.disabled = false;
    }
  }

  function appendLog(text, type = 'info') {
    if (!terminal) return;
    const line = document.createElement('div');
    if (type === 'success') line.className = 'val-log-success';
    else if (type === 'fail') line.className = 'val-log-fail';
    else line.className = 'val-log-info';
    
    line.innerHTML = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
}

export function initReviewSystem() {
  const btnRun = document.getElementById('btn-run-revisao-tests');
  const terminal = document.getElementById('revisao-terminal-output');
  const folderBtnLabel = document.querySelector('#btn-revisao-simulado .mission-status-label');
  
  if (!btnRun) return;
  
  const check1 = document.getElementById('check-rev-1');
  const check2 = document.getElementById('check-rev-2');
  const check3 = document.getElementById('check-rev-3');
  const check4 = document.getElementById('check-rev-4');
  
  btnRun.addEventListener('click', async () => {
    if (btnRun.disabled) return;
    btnRun.disabled = true;
    playBeep('click');
    
    if (terminal) {
      terminal.innerHTML = `<div class="val-log-info">&gt; Iniciando simulado de CRUD em ${API_URL}...</div>`;
    }
    
    if (check1) check1.checked = false;
    if (check2) check2.checked = false;
    if (check3) check3.checked = false;
    if (check4) check4.checked = false;
    
    if (check1) check1.dispatchEvent(new Event('change'));
    if (check2) check2.dispatchEvent(new Event('change'));
    if (check3) check3.dispatchEvent(new Event('change'));
    if (check4) check4.dispatchEvent(new Event('change'));
    
    let passedCount = 0;
    
    // Test A: GET /agentes
    appendLog('&gt; [TESTE A] Testando leitura (GET /agentes)...');
    try {
      const res = await fetch(`${API_URL}/agentes`);
      if (res.status === 200) {
        const data = await res.json();
        if (Array.isArray(data) && data.length >= 2) {
          const hasNeo = data.some(ag => ag.nome === 'Neo');
          const hasTrinity = data.some(ag => ag.nome === 'Trinity');
          if (hasNeo && hasTrinity) {
            appendLog('  ↳ Resposta: HTTP 200 OK. Registros "Neo" e "Trinity" encontrados!', 'success');
            if (check1) {
              check1.checked = true;
              check1.dispatchEvent(new Event('change'));
            }
            passedCount++;
            playBeep('success');
          } else {
            appendLog('  ↳ FALHA: Registros padrão "Neo" e "Trinity" não foram retornados.', 'fail');
          }
        } else {
          appendLog('  ↳ FALHA: A rota GET não retornou um array de agentes.', 'fail');
        }
      } else {
        appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
      }
    } catch(err) {
      appendLog('  ↳ ERRO DE CONEXÃO: Certifique-se de que o json-server está rodando na porta 3000.', 'fail');
    }
    
    await sleep(600);
    
    // Test B: POST /agentes
    appendLog('&gt; [TESTE B] Testando cadastro (POST /agentes)...');
    if (passedCount === 1) {
      try {
        const res = await fetch(`${API_URL}/agentes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: "9", nome: "Cypher", status: "Ativo" })
        });
        
        if (res.status === 201 || res.status === 200) {
          appendLog(`  ↳ Resposta: HTTP ${res.status} OK/Created. Registro cadastrado!`, 'success');
          if (check2) {
            check2.checked = true;
            check2.dispatchEvent(new Event('change'));
          }
          passedCount++;
          playBeep('success');
        } else {
          appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
        }
      } catch(err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao alcançar a rota POST.', 'fail');
      }
    } else {
      appendLog('  ↳ PULADO: Teste A falhou.', 'fail');
    }
    
    await sleep(600);
    
    // Test C: PUT /agentes/9
    appendLog('&gt; [TESTE C] Testando edição (PUT /agentes/9)...');
    if (passedCount === 2) {
      try {
        const res = await fetch(`${API_URL}/agentes/9`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: "Cypher", status: "Procurado" })
        });
        
        if (res.status === 200) {
          appendLog('  ↳ Resposta: HTTP 200 OK. Registro atualizado para "Procurado"!', 'success');
          if (check3) {
            check3.checked = true;
            check3.dispatchEvent(new Event('change'));
          }
          passedCount++;
          playBeep('success');
        } else {
          appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
        }
      } catch(err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao enviar requisição PUT.', 'fail');
      }
    } else {
      appendLog('  ↳ PULADO: Teste B falhou.', 'fail');
    }
    
    await sleep(600);
    
    // Test D: DELETE /agentes/9
    appendLog('&gt; [TESTE D] Testando remoção (DELETE /agentes/9)...');
    if (passedCount === 3) {
      try {
        const res = await fetch(`${API_URL}/agentes/9`, {
          method: 'DELETE'
        });
        
        if (res.status === 200 || res.status === 204) {
          appendLog(`  ↳ Resposta: HTTP ${res.status}. Registro temporário deletado.`, 'success');
          if (check4) {
            check4.checked = true;
            check4.dispatchEvent(new Event('change'));
          }
          passedCount++;
          playBeep('success');
        } else {
          appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
        }
      } catch(err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao enviar requisição DELETE.', 'fail');
      }
    } else {
      appendLog('  ↳ PULADO: Teste C falhou.', 'fail');
    }
    
    await sleep(500);
    
    if (passedCount === 4) {
      appendLog('\n🎉 SUCESSO! Simulado de CRUD homologado com sucesso.', 'success');
      if (folderBtnLabel) folderBtnLabel.textContent = 'Concluído';
      const btnRev = document.getElementById('btn-revisao-simulado');
      if (btnRev) btnRev.classList.add('completed');
      playBeep('complete');
    } else {
      appendLog('\n❌ FALHA: Alguns testes do simulado falharam. Depure seu json-server.', 'fail');
      if (folderBtnLabel) folderBtnLabel.textContent = 'Pendente';
      const btnRev = document.getElementById('btn-revisao-simulado');
      if (btnRev) btnRev.classList.remove('completed');
      playBeep('error');
    }
    
    window.dispatchEvent(new CustomEvent('state-changed'));
    btnRun.disabled = false;
  });
  
  function appendLog(text, type = 'info') {
    if (!terminal) return;
    const line = document.createElement('div');
    if (type === 'success') line.className = 'val-log-success';
    else if (type === 'fail') line.className = 'val-log-fail';
    else line.className = 'val-log-info';
    
    line.innerHTML = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
}

export function initReview2System() {
  const btnRun = document.getElementById('btn-run-revisao2-tests');
  const terminal = document.getElementById('revisao2-terminal-output');
  const folderBtnLabel = document.querySelector('#btn-revisao-simulado2 .mission-status-label');
  
  if (!btnRun) return;
  
  const check1 = document.getElementById('check-rev2-1');
  const check2 = document.getElementById('check-rev2-2');
  const check3 = document.getElementById('check-rev2-3');
  const check4 = document.getElementById('check-rev2-4');
  
  btnRun.addEventListener('click', async () => {
    if (btnRun.disabled) return;
    btnRun.disabled = true;
    playBeep('click');
    
    if (terminal) {
      terminal.innerHTML = `<div class="val-log-info">&gt; Iniciando simulado 2 de PATCH em ${API_URL}...</div>`;
    }
    
    if (check1) check1.checked = false;
    if (check2) check2.checked = false;
    if (check3) check3.checked = false;
    if (check4) check4.checked = false;
    
    if (check1) check1.dispatchEvent(new Event('change'));
    if (check2) check2.dispatchEvent(new Event('change'));
    if (check3) check3.dispatchEvent(new Event('change'));
    if (check4) check4.dispatchEvent(new Event('change'));
    
    let passedCount = 0;
    
    // Test A: GET /agentes
    appendLog('&gt; [TESTE A] Testando leitura inicial (GET /agentes)...');
    try {
      const res = await fetch(`${API_URL}/agentes`);
      if (res.status === 200) {
        const data = await res.json();
        if (Array.isArray(data) && data.length >= 2) {
          const hasTrinity = data.some(ag => ag.id === "2" || ag.id === 2);
          if (hasTrinity) {
            appendLog('  ↳ Resposta: HTTP 200 OK. Trinity encontrada para teste de PATCH!', 'success');
            if (check1) {
              check1.checked = true;
              check1.dispatchEvent(new Event('change'));
            }
            passedCount++;
            playBeep('success');
          } else {
            appendLog('  ↳ FALHA: Agente Trinity (ID 2) não encontrado no banco local.', 'fail');
          }
        } else {
          appendLog('  ↳ FALHA: A rota GET não retornou um array de agentes válido.', 'fail');
        }
      } else {
        appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
      }
    } catch(err) {
      appendLog('  ↳ ERRO DE CONEXÃO: Certifique-se de que o json-server está rodando.', 'fail');
    }
    
    await sleep(600);
    
    // Test B: PATCH /agentes/2 (partial status change to Oculto)
    appendLog('&gt; [TESTE B] Testando atualização parcial (PATCH /agentes/2)...');
    if (passedCount === 1) {
      try {
        const res = await fetch(`${API_URL}/agentes/2`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: "Oculto" })
        });
        
        if (res.status === 200) {
          const updated = await res.json();
          if (updated.status === 'Oculto' && updated.nome === 'Trinity') {
            appendLog('  ↳ Resposta: HTTP 200 OK. Status alterado preservando o nome original!', 'success');
            if (check2) {
              check2.checked = true;
              check2.dispatchEvent(new Event('change'));
            }
            passedCount++;
            playBeep('success');
          } else {
            appendLog('  ↳ FALHA: A modificação parcial corrompeu outros atributos ou falhou.', 'fail');
          }
        } else {
          appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
        }
      } catch(err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao enviar chamada PATCH.', 'fail');
      }
    } else {
      appendLog('  ↳ PULADO: Teste A falhou.', 'fail');
    }
    
    await sleep(600);
    
    // Test C: POST /agentes (Create Niobe ID 10)
    appendLog('&gt; [TESTE C] Testando cadastro complementar (POST /agentes)...');
    if (passedCount === 2) {
      try {
        const res = await fetch(`${API_URL}/agentes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: "10", nome: "Niobe", status: "Ativo" })
        });
        
        if (res.status === 201 || res.status === 200) {
          appendLog(`  ↳ Resposta: HTTP ${res.status}. Niobe cadastrada com sucesso!`, 'success');
          if (check3) {
            check3.checked = true;
            check3.dispatchEvent(new Event('change'));
          }
          passedCount++;
          playBeep('success');
        } else {
          appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
        }
      } catch(err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao alcançar POST no teste C.', 'fail');
      }
    } else {
      appendLog('  ↳ PULADO: Teste B falhou.', 'fail');
    }
    
    await sleep(600);
    
    // Test D: DELETE /agentes/10 (Clean Niobe)
    appendLog('&gt; [TESTE D] Testando remoção complementar (DELETE /agentes/10)...');
    if (passedCount === 3) {
      try {
        const res = await fetch(`${API_URL}/agentes/10`, {
          method: 'DELETE'
        });
        
        if (res.status === 200 || res.status === 204) {
          appendLog(`  ↳ Resposta: HTTP ${res.status}. Registro Niobe removido.`, 'success');
          if (check4) {
            check4.checked = true;
            check4.dispatchEvent(new Event('change'));
          }
          passedCount++;
          playBeep('success');
        } else {
          appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
        }
      } catch(err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao enviar requisição DELETE.', 'fail');
      }
    } else {
      appendLog('  ↳ PULADO: Teste C falhou.', 'fail');
    }
    
    await sleep(500);
    
    if (passedCount === 4) {
      appendLog('\n🎉 SUCESSO! Simulado 2 de PATCH homologado com sucesso.', 'success');
      if (folderBtnLabel) folderBtnLabel.textContent = 'Concluído';
      const btnRev2 = document.getElementById('btn-revisao-simulado2');
      if (btnRev2) btnRev2.classList.add('completed');
      playBeep('complete');
    } else {
      appendLog('\n❌ FALHA: Alguns testes do simulado 2 falharam. Depure seu json-server.', 'fail');
      if (folderBtnLabel) folderBtnLabel.textContent = 'Pendente';
      const btnRev2 = document.getElementById('btn-revisao-simulado2');
      if (btnRev2) btnRev2.classList.remove('completed');
      playBeep('error');
    }
    
    window.dispatchEvent(new CustomEvent('state-changed'));
    btnRun.disabled = false;
  });
  
  function appendLog(text, type = 'info') {
    if (!terminal) return;
    const line = document.createElement('div');
    if (type === 'success') line.className = 'val-log-success';
    else if (type === 'fail') line.className = 'val-log-fail';
    else line.className = 'val-log-info';
    
    line.innerHTML = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
}

export function initReview3System() {
  const btnRun = document.getElementById('btn-run-revisao3-tests');
  const terminal = document.getElementById('revisao3-terminal-output');
  const folderBtnLabel = document.querySelector('#btn-revisao-simulado3 .mission-status-label');
  
  if (!btnRun) return;
  
  const check1 = document.getElementById('check-rev3-1');
  const check2 = document.getElementById('check-rev3-2');
  const check3 = document.getElementById('check-rev3-3');
  
  btnRun.addEventListener('click', async () => {
    if (btnRun.disabled) return;
    btnRun.disabled = true;
    playBeep('click');
    
    if (terminal) {
      terminal.innerHTML = `<div class="val-log-info">&gt; Iniciando teste de Filtros (Query Params) em ${API_URL}...</div>`;
    }
    
    if (check1) check1.checked = false;
    if (check2) check2.checked = false;
    if (check3) check3.checked = false;
    
    if (check1) check1.dispatchEvent(new Event('change'));
    if (check2) check2.dispatchEvent(new Event('change'));
    if (check3) check3.dispatchEvent(new Event('change'));
    
    let passedCount = 0;
    
    // Test A: GET /agentes?status=Ativo
    appendLog('&gt; [TESTE A] Buscando ativos (GET /agentes?status=Ativo)...');
    try {
      const res = await fetch(`${API_URL}/agentes?status=Ativo`);
      if (res.status === 200) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const allActive = data.every(ag => ag.status === 'Ativo');
          const hasNeo = data.some(ag => ag.nome && ag.nome.toLowerCase() === 'neo');
          if (allActive && hasNeo && data.length > 0) {
            appendLog('  ↳ Resposta: HTTP 200 OK. Apenas agentes ativos foram retornados!', 'success');
            if (check1) {
              check1.checked = true;
              check1.dispatchEvent(new Event('change'));
            }
            passedCount++;
            playBeep('success');
          } else {
            appendLog('  ↳ FALHA: Retornou registros inativos ou a lista está vazia.', 'fail');
          }
        } else {
          appendLog('  ↳ FALHA: A resposta do filtro não é um array válido.', 'fail');
        }
      } else {
        appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
      }
    } catch(err) {
      appendLog('  ↳ ERRO DE CONEXÃO: Certifique-se de que o json-server está rodando.', 'fail');
    }
    
    await sleep(600);
    
    // Test B: GET /agentes?status=Oculto
    appendLog('&gt; [TESTE B] Buscando ocultos (GET /agentes?status=Oculto)...');
    try {
      const res = await fetch(`${API_URL}/agentes?status=Oculto`);
      if (res.status === 200) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const allOculto = data.every(ag => ag.status === 'Oculto');
          const hasTrinity = data.some(ag => ag.nome && ag.nome.toLowerCase() === 'trinity');
          if (allOculto && hasTrinity && data.length > 0) {
            appendLog('  ↳ Resposta: HTTP 200 OK. Apenas agentes ocultos foram retornados!', 'success');
            if (check2) {
              check2.checked = true;
              check2.dispatchEvent(new Event('change'));
            }
            passedCount++;
            playBeep('success');
          } else {
            appendLog('  ↳ FALHA: Retornou registros não ocultos ou a lista está vazia.', 'fail');
          }
        } else {
          appendLog('  ↳ FALHA: A resposta do filtro não é um array válido.', 'fail');
        }
      } else {
        appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
      }
    } catch(err) {
      appendLog('  ↳ ERRO DE CONEXÃO: Falha ao alcançar o servidor.', 'fail');
    }
    
    await sleep(600);
    
    // Test C: GET /agentes?nome=Neo
    appendLog('&gt; [TESTE C] Buscando por nome exato (GET /agentes?nome=Neo)...');
    try {
      const res = await fetch(`${API_URL}/agentes?nome=Neo`);
      if (res.status === 200) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const onlyNeo = data.every(ag => ag.nome === 'Neo');
          if (onlyNeo && data.length === 1) {
            appendLog('  ↳ Resposta: HTTP 200 OK. Apenas o agente "Neo" foi retornado!', 'success');
            if (check3) {
              check3.checked = true;
              check3.dispatchEvent(new Event('change'));
            }
            passedCount++;
            playBeep('success');
          } else {
            appendLog('  ↳ FALHA: Retornou múltiplos registros ou nenhum correspondente a "Neo".', 'fail');
          }
        } else {
          appendLog('  ↳ FALHA: A resposta do filtro não é um array válido.', 'fail');
        }
      } else {
        appendLog(`  ↳ FALHA: Servidor respondeu com HTTP ${res.status}.`, 'fail');
      }
    } catch(err) {
      appendLog('  ↳ ERRO DE CONEXÃO: Falha ao alcançar o servidor.', 'fail');
    }
    
    await sleep(500);
    
    if (passedCount === 3) {
      appendLog('\n🎉 SUCESSO! Exercício de Filtros homologado com sucesso.', 'success');
      if (folderBtnLabel) folderBtnLabel.textContent = 'Concluído';
      const btnRev = document.getElementById('btn-revisao-simulado3');
      if (btnRev) btnRev.classList.add('completed');
      playBeep('complete');
    } else {
      appendLog('\n❌ FALHA: Alguns testes de filtros falharam. Depure seu json-server.', 'fail');
      if (folderBtnLabel) folderBtnLabel.textContent = 'Pendente';
      const btnRev = document.getElementById('btn-revisao-simulado3');
      if (btnRev) btnRev.classList.remove('completed');
      playBeep('error');
    }
    
    window.dispatchEvent(new CustomEvent('state-changed'));
    btnRun.disabled = false;
  });
  
  function appendLog(text, type = 'info') {
    if (!terminal) return;
    const line = document.createElement('div');
    if (type === 'success') line.className = 'val-log-success';
    else if (type === 'fail') line.className = 'val-log-fail';
    else line.className = 'val-log-info';
    
    line.innerHTML = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
}

export function initExAGetSystem() {
  const btnValida = document.getElementById('btn-valida-get');
  const terminal = document.getElementById('valida-get-output');
  const check1 = document.getElementById('check-ex-get-1');
  const check2 = document.getElementById('check-ex-get-2');
  
  if (!btnValida) return;
  
  btnValida.addEventListener('click', async () => {
    if (btnValida.disabled) return;
    btnValida.disabled = true;
    playBeep('click');
    
    if (terminal) {
      terminal.innerHTML = `<div class="val-log-info">&gt; Iniciando auditoria do Exercício A (GET) em ${API_URL}...</div>`;
    }
    
    if (check1) { check1.checked = false; check1.dispatchEvent(new Event('change')); }
    if (check2) { check2.checked = false; check2.dispatchEvent(new Event('change')); }
    
    try {
      const res = await fetch(`${API_URL}/agentes`);
      if (res.status === 200) {
        appendLog('  ↳ Resposta: HTTP 200 OK! Conexão com o json-server estabelecida.', 'success');
        if (check1) {
          check1.checked = true;
          check1.dispatchEvent(new Event('change'));
        }
        
        const data = await res.json();
        if (Array.isArray(data)) {
          const hasNeo = data.some(ag => ag.nome && ag.nome.toLowerCase() === 'neo');
          const hasTrinity = data.some(ag => ag.nome && ag.nome.toLowerCase() === 'trinity');
          
          if (hasNeo && hasTrinity) {
            appendLog('  ↳ Sucesso: Agentes "Neo" e "Trinity" encontrados na resposta!', 'success');
            if (check2) {
              check2.checked = true;
              check2.dispatchEvent(new Event('change'));
            }
            appendLog('\n🎉 EXCELENTE! Exercício A validado com sucesso!', 'success');
            playBeep('complete');
          } else {
            appendLog('  ↳ FALHA: Não foram encontrados "Neo" e "Trinity" na lista de agentes.', 'fail');
            playBeep('error');
          }
        } else {
          appendLog('  ↳ FALHA: A rota GET não retornou uma lista/array de agentes.', 'fail');
          playBeep('error');
        }
      } else {
        appendLog(`  ↳ FALHA: O servidor respondeu com status HTTP ${res.status}. Esperava 200.`, 'fail');
        playBeep('error');
      }
    } catch (err) {
      appendLog('  ↳ ERRO DE CONEXÃO: Não foi possível acessar o json-server na porta 3000.', 'fail');
      appendLog('  ↳ Dica: Certifique-se de iniciar o servidor com: npx json-server db.json', 'info');
      playBeep('error');
    }
    
    btnValida.disabled = false;
  });
  
  function appendLog(text, type = 'info') {
    if (!terminal) return;
    const line = document.createElement('div');
    if (type === 'success') line.className = 'val-log-success';
    else if (type === 'fail') line.className = 'val-log-fail';
    else line.className = 'val-log-info';
    line.innerHTML = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
}

export function initExBPostSystem() {
  const btnValida = document.getElementById('btn-valida-post');
  const terminal = document.getElementById('valida-post-output');
  const check1 = document.getElementById('check-ex-post-1');
  const check2 = document.getElementById('check-ex-post-2');
  
  if (!btnValida) return;
  
  btnValida.addEventListener('click', async () => {
    if (btnValida.disabled) return;
    btnValida.disabled = true;
    playBeep('click');
    
    if (terminal) {
      terminal.innerHTML = `<div class="val-log-info">&gt; Iniciando auditoria do Exercício B (POST) em ${API_URL}...</div>`;
    }
    
    if (check1) { check1.checked = false; check1.dispatchEvent(new Event('change')); }
    if (check2) { check2.checked = false; check2.dispatchEvent(new Event('change')); }
    
    try {
      // Check if Cypher (ID 9) was created
      const res = await fetch(`${API_URL}/agentes/9`);
      if (res.status === 200) {
        const data = await res.json();
        if (data && data.nome && data.nome.toLowerCase() === 'cypher') {
          appendLog('  ↳ Sucesso: Envio da requisição POST verificado com sucesso!', 'success');
          if (check1) {
            check1.checked = true;
            check1.dispatchEvent(new Event('change'));
          }
          
          appendLog(`  ↳ Sucesso: Agente "Cypher" (ID 9) está salvo no banco com status "${data.status}"!`, 'success');
          if (check2) {
            check2.checked = true;
            check2.dispatchEvent(new Event('change'));
          }
          
          appendLog('\n🎉 EXCELENTE! Exercício B validado com sucesso!', 'success');
          playBeep('complete');
        } else {
          appendLog('  ↳ FALHA: Encontrou o registro com ID 9, mas o nome não é "Cypher".', 'fail');
          playBeep('error');
        }
      } else if (res.status === 404) {
        appendLog('  ↳ FALHA: O agente Cypher (ID 9) não foi encontrado no banco.', 'fail');
        appendLog('  ↳ Dica: Escreva o fetch de POST no app.js e recarregue a página local para dispará-lo.', 'info');
        playBeep('error');
      } else {
        appendLog(`  ↳ FALHA: O servidor respondeu com status HTTP ${res.status} ao consultar o ID 9.`, 'fail');
        playBeep('error');
      }
    } catch (err) {
      appendLog('  ↳ ERRO DE CONEXÃO: json-server indisponível na porta 3000.', 'fail');
      playBeep('error');
    }
    
    btnValida.disabled = false;
  });
  
  function appendLog(text, type = 'info') {
    if (!terminal) return;
    const line = document.createElement('div');
    if (type === 'success') line.className = 'val-log-success';
    else if (type === 'fail') line.className = 'val-log-fail';
    else line.className = 'val-log-info';
    line.innerHTML = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
}

export function initExCPutDeleteSystem() {
  const btnValida = document.getElementById('btn-valida-put-delete');
  const terminal = document.getElementById('valida-put-delete-output');
  const check1 = document.getElementById('check-ex-put-delete-1');
  const check2 = document.getElementById('check-ex-put-delete-2');
  
  if (!btnValida) return;
  
  let currentStep = 0;
  
  btnValida.addEventListener('click', async () => {
    if (btnValida.disabled) return;
    btnValida.disabled = true;
    playBeep('click');
    
    if (currentStep === 0) {
      if (terminal) {
        terminal.innerHTML = `<div class="val-log-info">&gt; [PASSO 1] Inicializando ambiente do Exercício C...</div>`;
      }
      
      if (check1) { check1.checked = false; check1.dispatchEvent(new Event('change')); }
      if (check2) { check2.checked = false; check2.dispatchEvent(new Event('change')); }
      
      try {
        // Delete Cypher first if exists to have a clean slate
        try {
          await fetch(`${API_URL}/agentes/9`, { method: 'DELETE' });
        } catch (e) {}
        
        // Post Cypher as Ativo
        const postRes = await fetch(`${API_URL}/agentes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: "9", nome: "Cypher", status: "Ativo" })
        });
        
        if (postRes.status === 201 || postRes.status === 200) {
          appendLog('  ↳ Sucesso: Agente Cypher (ID 9) inserido com status "Ativo".', 'success');
          appendLog('\n&gt; INSTRUÇÃO DE EDIÇÃO (PUT):');
          appendLog('  ↳ Programe seu fetch com método PUT para alterar o status do Cypher para "Procurado".');
          appendLog('  ↳ Exemplo: <code>fetch(\'http://localhost:3000/agentes/9\', { method: \'PUT\', headers: {\'Content-Type\': \'application/json\'}, body: JSON.stringify({ nome: "Cypher", status: "Procurado" }) })</code>');
          appendLog('  ↳ Clique no botão abaixo para verificar a alteração.');
          
          btnValida.textContent = 'Validar PUT (Cypher)';
          btnValida.className = 'btn-primary btn-yellow';
          currentStep = 1;
        } else {
          appendLog(`  ↳ FALHA: Não foi possível criar Cypher para o teste (HTTP ${postRes.status}).`, 'fail');
          playBeep('error');
        }
      } catch (err) {
        appendLog('  ↳ ERRO DE CONEXÃO: json-server offline na porta 3000.', 'fail');
        playBeep('error');
      }
    } else if (currentStep === 1) {
      if (terminal) {
        appendLog('\n&gt; Verificando alteração do status para "Procurado"...');
      }
      
      try {
        const res = await fetch(`${API_URL}/agentes/9`);
        if (res.status === 200) {
          const data = await res.json();
          if (data && data.status === 'Procurado') {
            appendLog('  ↳ Sucesso: Status do Cypher alterado para "Procurado" via PUT!', 'success');
            if (check1) {
              check1.checked = true;
              check1.dispatchEvent(new Event('change'));
            }
            playBeep('success');
            
            appendLog('\n&gt; INSTRUÇÃO DE REMOÇÃO (DELETE):');
            appendLog('  ↳ Agora programe seu fetch com método DELETE para remover o Cypher (ID 9) do banco local.');
            appendLog('  ↳ Exemplo: <code>fetch(\'http://localhost:3000/agentes/9\', { method: \'DELETE\' })</code>');
            appendLog('  ↳ Clique no botão abaixo para verificar a remoção.');
            
            btnValida.textContent = 'Validar DELETE (Cypher)';
            btnValida.className = 'btn-primary btn-red';
            currentStep = 2;
          } else {
            appendLog(`  ↳ FALHA: O Cypher ainda está com status "${data.status || 'indefinido'}". Esperava "Procurado".`, 'fail');
            playBeep('error');
          }
        } else {
          appendLog(`  ↳ FALHA: Não foi possível encontrar o Cypher (HTTP ${res.status}).`, 'fail');
          playBeep('error');
        }
      } catch (err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao alcançar o servidor.', 'fail');
        playBeep('error');
      }
    } else if (currentStep === 2) {
      if (terminal) {
        appendLog('\n&gt; Verificando remoção do Cypher...');
      }
      
      try {
        const res = await fetch(`${API_URL}/agentes/9`);
        if (res.status === 404 || res.status === 204) {
          appendLog('  ↳ Sucesso: Cypher removido com sucesso (HTTP 404 Not Found)!', 'success');
          if (check2) {
            check2.checked = true;
            check2.dispatchEvent(new Event('change'));
          }
          appendLog('\n🎉 EXCELENTE! Exercício C validado com sucesso!', 'success');
          playBeep('complete');
          
          btnValida.textContent = 'Reiniciar Exercício C';
          btnValida.className = 'btn-primary';
          currentStep = 0;
        } else if (res.status === 200) {
          const data = await res.json();
          if (!data || Object.keys(data).length === 0) {
            appendLog('  ↳ Sucesso: Cypher removido (Banco retornou objeto vazio)!', 'success');
            if (check2) {
              check2.checked = true;
              check2.dispatchEvent(new Event('change'));
            }
            appendLog('\n🎉 EXCELENTE! Exercício C validado com sucesso!', 'success');
            playBeep('complete');
            
            btnValida.textContent = 'Reiniciar Exercício C';
            btnValida.className = 'btn-primary';
            currentStep = 0;
          } else {
            appendLog('  ↳ FALHA: Cypher ainda existe no banco de dados local.', 'fail');
            playBeep('error');
          }
        } else {
          appendLog(`  ↳ FALHA: O servidor retornou HTTP ${res.status} ao consultar o ID 9.`, 'fail');
          playBeep('error');
        }
      } catch (err) {
        appendLog('  ↳ ERRO DE CONEXÃO: Falha ao alcançar o servidor.', 'fail');
        playBeep('error');
      }
    }
    
    btnValida.disabled = false;
  });
  
  function appendLog(text, type = 'info') {
    if (!terminal) return;
    const line = document.createElement('div');
    if (type === 'success') line.className = 'val-log-success';
    else if (type === 'fail') line.className = 'val-log-fail';
    else line.className = 'val-log-info';
    line.innerHTML = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
