export const API_URL = 'http://localhost:3000';
export const PING_INTERVAL = 5000;

export const PASSWORDS = {
  teacher: 'PROF2026',
  exam: 'MATRIX2026'
};

export const TEACHER_DATA = {
  'aula1-mod1': {
    title: 'Aula 01 // Módulo 1.1: O Lado Oculto da Web',
    guideline: `
      <div class="guideline-section-title">Objetivo Pedagógico</div>
      <p>Introduzir o conceito de arquitetura Cliente-Servidor e o tráfego HTTP.</p>
      <div class="guideline-section-title">Pontos de Destaque</div>
      <ul class="guideline-list">
        <li>Explique a diferença clara de papéis: Frontend consome, Backend processa/persiste.</li>
        <li>Demonstre a analogia técnica do restaurante no fluxo interativo acima.</li>
        <li>Conceitue CORS de forma simples: uma trava no navegador para proteção do usuário.</li>
      </ul>
    `,
    solution: `// Módulo conceitual teórico.
// Sem exercícios práticos de código.`
  },
  'aula1-mod2': {
    title: 'Aula 01 // Módulo 1.2: Quiz de Fixação',
    guideline: `
      <div class="guideline-section-title">Objetivo Pedagógico</div>
      <p>Fixar os conceitos teóricos de cliente-servidor, status codes, verbos HTTP e CORS antes de iniciar as atividades práticas.</p>
      <div class="guideline-section-title">Pontos de Destaque</div>
      <ul class="guideline-list">
        <li>Estimule os alunos a responderem de forma consciente baseados na teoria do Módulo 1.1.</li>
        <li>O checklist é atualizado e o progresso é liberado automaticamente apenas com 100% de acertos.</li>
      </ul>
    `,
    solution: `// Respostas corretas do Quiz:
// Q1: B (Frontend roda no navegador cuidando da interface visual, Backend roda no servidor cuidando dos dados e persistência)
// Q2: C (HTTP 201 indica que o recurso foi criado com sucesso)
// Q3: B (PATCH é usado para atualizações parciais)
// Q4: A (Navegador impede por segurança que sites HTTPS acessem servidores HTTP locais sem preflight/PNA)`
  },
  'aula1-mod3': {
    title: 'Aula 01 // Módulo 1.3: Exercício A: Ler Dados (GET)',
    guideline: `
      <div class="guideline-section-title">Objetivo Pedagógico</div>
      <p>Configurar o banco de dados inicial e executar a primeira chamada HTTP GET para ler dados de forma isolada.</p>
      <div class="guideline-section-title">Pontos de Destaque</div>
      <ul class="guideline-list">
        <li>Ajude os alunos a criarem o arquivo db.json com Neo e Trinity e subirem o json-server.</li>
        <li>O fetch de GET deve imprimir os dados no console para o aluno conferir o formato.</li>
      </ul>
    `,
    solution: `// Código sugerido no app.js local para o Exercício A:
fetch('http://localhost:3000/agentes')
  .then(res => res.json())
  .then(console.log);`
  },
  'aula1-mod4': {
    title: 'Aula 01 // Módulo 1.4: Exercício B: Enviar Dados (POST)',
    guideline: `
      <div class="guideline-section-title">Objetivo Pedagógico</div>
      <p>Aprender a cadastrar dados no banco usando o método POST, passando headers apropriados e convertendo objetos para JSON string.</p>
      <div class="guideline-section-title">Pontos de Destaque</div>
      <ul class="guideline-list">
        <li>Enfatize a necessidade do 'Content-Type': 'application/json' nos cabeçalhos.</li>
        <li>Mostre como o JSON.stringify transforma objetos em texto trafegável.</li>
      </ul>
    `,
    solution: `// Código sugerido no app.js local para o Exercício B:
fetch('http://localhost:3000/agentes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: "9", nome: "Cypher", status: "Ativo" })
})
.then(res => res.json())
.then(console.log);`
  },
  'aula1-mod5': {
    title: 'Aula 01 // Módulo 1.5: Exercício C: Editar e Deletar (PUT/DELETE)',
    guideline: `
      <div class="guideline-section-title">Objetivo Pedagógico</div>
      <p>Dominar a alteração completa de dados com PUT e a remoção física de registros com o verbo DELETE.</p>
      <div class="guideline-section-title">Pontos de Destaque</div>
      <ul class="guideline-list">
        <li>Mostre que tanto o PUT quanto o DELETE exigem o ID do recurso na URL (ex: /agentes/9).</li>
        <li>Instrua os alunos a executarem o PUT primeiro e depois o DELETE de forma isolada, conforme guiado pelo auditor interativo.</li>
      </ul>
    `,
    solution: `// Código sugerido no app.js local para o Exercício C:
// 1. Atualizar via PUT:
fetch('http://localhost:3000/agentes/9', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome: "Cypher", status: "Procurado" })
})
.then(res => res.json())
.then(console.log);

// 2. Deletar via DELETE:
fetch('http://localhost:3000/agentes/9', {
  method: 'DELETE'
})
.then(console.log);`
  },
  'revisao-simulado': {
    title: 'Revisão // Simulado de CRUD',
    guideline: `
      <div class="guideline-section-title">Objetivo Pedagógico</div>
      <p>Simular o fluxo completo da avaliação final, rodando testes CRUD (GET, POST, PUT, DELETE) na máquina do aluno.</p>
      <div class="guideline-section-title">Pontos de Destaque</div>
      <ul class="guideline-list">
        <li>Os alunos praticarão subindo o JSON Server local na porta 3000.</li>
        <li>O simulador tenta criar, ler, editar e remover o agente Cypher (ID 9).</li>
        <li>Isso garante que todas as operações básicas de persistência e requisições HTTP da Aula 1 foram compreendidas.</li>
      </ul>
    `,
    solution: `// Comando para rodar o servidor simulado localmente:
npx json-server@0.17.4 db.json --port 3000
 
// db.json de seed padrão da Aula 1:
{
  "agentes": [
    { "id": "1", "nome": "Neo", "status": "Ativo" },
    { "id": "2", "nome": "Trinity", "status": "Oculto" }
  ]
}
 
// Rotas consumidas no teste do simulado:
// 1. GET http://localhost:3000/agentes
// 2. POST http://localhost:3000/agentes (com id: "9", nome: "Cypher", status: "Ativo")
// 3. PUT http://localhost:3000/agentes/9 (com nome: "Cypher", status: "Procurado")
// 4. DELETE http://localhost:3000/agentes/9`
  },
  'revisao-simulado2': {
    title: 'Revisão // Simulado Avançado (PATCH)',
    guideline: `
      <div class="guideline-section-title">Objetivo Pedagógico</div>
      <p>Simular atualizações parciais com o método <code>PATCH</code> e a leitura de dados no backend local.</p>
      <div class="guideline-section-title">Pontos de Destaque</div>
      <ul class="guideline-list">
        <li>Os alunos usarão o verbo <code>PATCH</code> para editar apenas propriedades específicas do registro.</li>
        <li>O simulador testa a alteração parcial do status da Trinity (ID 2) para "Oculto" preservando seu nome.</li>
        <li>O simulador também valida a inclusão e exclusão do agente Niobe (ID 10) para testar o CRUD combinado.</li>
      </ul>
    `,
    solution: `// Comando para rodar o servidor simulado localmente:
npx json-server@0.17.4 db.json --port 3000
 
// Exemplo de chamada PATCH para atualização parcial:
fetch('http://localhost:3000/agentes/2', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: "Oculto" })
})
.then(res => res.json())
.then(console.log);`
  },
  'revisao-simulado3': {
    title: 'Revisão // Exercício Extra: Filtros (Query Params)',
    guideline: `
      <div class="guideline-section-title">Objetivo Pedagógico</div>
      <p>Entender como funcionam os filtros de busca no HTTP usando parâmetros na URL (query string/query parameters).</p>
      <div class="guideline-section-title">Pontos de Destaque</div>
      <ul class="guideline-list">
        <li>Explique o formato chave-valor na query string: <code>?chave=valor</code>.</li>
        <li>O json-server cria filtros automáticos para as propriedades do JSON.</li>
        <li>Mostre a diferença entre ler todos os agentes (<code>GET /agentes</code>) e aplicar filtros (<code>GET /agentes?status=Ativo</code>).</li>
      </ul>
    `,
    solution: `// Exemplos de chamadas GET com Query Parameters:
// 1. Filtrar apenas ativos:
fetch('http://localhost:3000/agentes?status=Ativo')
  .then(res => res.json())
  .then(console.log);
 
// 2. Filtrar por nome exato:
fetch('http://localhost:3000/agentes?nome=Neo')
  .then(res => res.json())
  .then(console.log);`
  },
  'avaliacao1': {
    title: 'Avaliação 1 // Teste Prático de Backend (6 Verbos e Validação de Persistência)',
    guideline: `
      <div class="guideline-section-title">Objetivo Pedagógico (Prova)</div>
      <p>Verificar se o aluno consegue subir um servidor local (JSON Server ou Express) na porta 3000 e responder de forma sólida e persistente a requisições CRUD completas (GET, POST, PUT, PATCH, DELETE, OPTIONS) na rota <code>/agentes</code>.</p>
      <div class="guideline-section-title">Pontos de Destaque</div>
      <ul class="guideline-list">
        <li>A prova prática vale nota de <strong>0.0 a 10.0</strong>, baseando-se no número proporcional de acertos nos 6 testes.</li>
        <li>Para evitar que rotas simuladas sem persistência sejam validadas (ex: apenas retornando 200 OK estático), o validador realiza consultas de leitura (GET) após cada operação de escrita/remoção.</li>
        <li>O arquivo <code>db.json</code> deve iniciar contendo os agentes "Neo" (status: Ativo) e "Trinity" (status: Oculto).</li>
      </ul>
      <div class="guideline-section-title">Apoio de Depuração</div>
      <p>Caso algum teste falhe, peça para o aluno inspecionar se as chamadas de alteração estão persistindo os dados no arquivo e se a porta 3000 está livre e ativa.</p>
    `,
    solution: `// Comando para iniciar o servidor mock local:
npx json-server@0.17.4 db.json --port 3000

// Sequência exata de operações testadas pelo validador:
// 1. GET /agentes (Valida se Neo e Trinity iniciais constam no banco)
// 2. POST /agentes -> Insere Morpheus (ID 3). Em seguida, GET /agentes/3 valida se os dados foram salvos.
// 3. PUT /agentes/2 -> Atualiza Trinity para "Ativo". Em seguida, GET /agentes/2 valida a persistência.
// 4. PATCH /agentes/2 -> Altera apenas o status de Trinity para "Oculto". Em seguida, GET /agentes/2 valida o status e se o nome original "Trinity" foi mantido.
// 5. DELETE /agentes/3 -> Remove Morpheus. Em seguida, GET /agentes/3 espera HTTP 404 para homologar a remoção.
// 6. OPTIONS /agentes -> Checa se o servidor responde a requisições preflight do CORS (HTTP 200/204).`
  }
};

// Auto-fill dictionary keys for all other modules to prevent reference errors
for (let a = 2; a <= 5; a++) {
  for (let m = 1; m <= 5; m++) {
    const key = `aula${a}-mod${m}`;
    TEACHER_DATA[key] = {
      title: `Aula 0${a} // Módulo ${a}.${m}`,
      guideline: `
        <div class="guideline-section-title">Objetivo Pedagógico</div>
        <p>Desenvolver os conceitos correspondentes à Aula 0${a} Módulo ${m} descritos na ementa.</p>
        <div class="guideline-section-title">Pontos de Destaque</div>
        <ul class="guideline-list">
          <li>Instrua os alunos a executarem as atividades passo a passo no seu VS Code local.</li>
          <li>Garantir a verificação dos checklists antes de prosseguir.</li>
        </ul>
      `,
      solution: `// Soluções para Aula 0${a} - Módulo ${m}.
// Consulte a trilha local para códigos de referência correspondentes.`
    };
  }
}
