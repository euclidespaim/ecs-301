// Slide Navigation System
let currentSlide = 1;
const totalSlides = 8;

const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const currentSlideNumSpan = document.getElementById('current-slide-num');
const totalSlidesNumSpan = document.getElementById('total-slides-num');
const progressBarFill = document.getElementById('slide-progress-bar');

function updateSlides() {
  slides.forEach((slide, index) => {
    const slideNum = index + 1;
    slide.className = 'slide'; // Reset classes
    
    if (slideNum === currentSlide) {
      slide.classList.add('active');
    } else if (slideNum < currentSlide) {
      slide.classList.add('prev');
    } else {
      slide.classList.add('next');
    }
  });

  // Update HUD
  currentSlideNumSpan.textContent = currentSlide;
  const progressPercent = (currentSlide / totalSlides) * 100;
  progressBarFill.style.width = `${progressPercent}%`;

  // Update button states
  prevBtn.disabled = currentSlide === 1;
  nextBtn.disabled = currentSlide === totalSlides;
}

function nextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updateSlides();
  }
}

function prevSlide() {
  if (currentSlide > 1) {
    currentSlide--;
    updateSlides();
  }
}

// Event Listeners for Buttons
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Keyboard Navigation
document.addEventListener('keydown', (event) => {
  // Ignore shortcuts if user is typing in the sandbox fields
  const activeElement = document.activeElement;
  if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'SELECT')) {
    return;
  }

  if (event.key === 'ArrowRight' || event.key === 'Space') {
    nextSlide();
    if (event.key === 'Space') event.preventDefault(); // Prevent page scroll
  } else if (event.key === 'ArrowLeft') {
    prevSlide();
  }
});

// --- HTTP PLAYGROUND / SANDBOX LOGIC ---
const reqMethodSelect = document.getElementById('req-method');
const reqPathInput = document.getElementById('req-path');
const reqBodyTextarea = document.getElementById('req-body');
const bodyFormGroup = document.getElementById('body-form-group');
const btnSendRequest = document.getElementById('btn-send-request');
const rawRequestOutput = document.getElementById('raw-request-output');
const rawResponseOutput = document.getElementById('raw-response-output');
const responseStatusBadge = document.getElementById('response-status-badge');

// Default values depending on method
const methodDefaults = {
  GET: { path: '/usuarios', body: '' },
  POST: { path: '/usuarios', body: '{\n  "nome": "Carla Silva",\n  "cargo": "Tech Lead"\n}' },
  PUT: { path: '/usuarios/1', body: '{\n  "nome": "Carla Silva Costa",\n  "cargo": "Principal Architect"\n}' },
  PATCH: { path: '/usuarios/1', body: '{\n  "cargo": "Diretora de Engenharia"\n}' },
  DELETE: { path: '/usuarios/1', body: '' },
  OPTIONS: { path: '/usuarios', body: '' },
  HEAD: { path: '/usuarios', body: '' }
};

reqMethodSelect.addEventListener('change', () => {
  const method = reqMethodSelect.value;
  const defaults = methodDefaults[method];

  // Show/Hide Request Body field
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    bodyFormGroup.style.display = 'block';
  } else {
    bodyFormGroup.style.display = 'none';
  }

  // Set default values
  reqPathInput.value = defaults.path;
  reqBodyTextarea.value = defaults.body;
});

btnSendRequest.addEventListener('click', simulateHTTPRequest);

function simulateHTTPRequest() {
  const method = reqMethodSelect.value;
  const path = reqPathInput.value.trim();
  let body = reqBodyTextarea.value.trim();

  // 1. Build Raw HTTP Request
  let rawRequest = `${method} ${path} HTTP/1.1\n`;
  rawRequest += `Host: api.exemplo.com\n`;
  rawRequest += `User-Agent: HTTPPlayground/1.0 (WebPresentation)\n`;
  rawRequest += `Accept: application/json\n`;

  if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
    try {
      // Validate JSON formatting
      JSON.parse(body);
    } catch (e) {
      alert('Erro: O corpo da requisição precisa ser um JSON válido!');
      return;
    }
    
    // Add headers and content
    rawRequest += `Content-Type: application/json\n`;
    rawRequest += `Content-Length: ${body.length}\n`;
    rawRequest += `\n`;
    rawRequest += body;
  } else {
    rawRequest += `\n`;
  }
  rawRequestOutput.textContent = rawRequest;

  // 2. Mock Server Logic and Response Generation
  let status = 200;
  let statusText = 'OK';
  let responseHeaders = {
    'Date': new Date().toUTCString(),
    'Server': 'MockServer/1.0',
    'Connection': 'keep-alive'
  };
  let responseBody = '';

  // Routing simulation
  if (path === '/usuarios') {
    if (method === 'GET') {
      status = 200;
      statusText = 'OK';
      responseHeaders['Content-Type'] = 'application/json';
      responseBody = JSON.stringify([
        { id: 1, nome: "Lucas Souza", cargo: "Dev Backend" },
        { id: 2, nome: "Bruna Gomes", cargo: "Dev Frontend" }
      ], null, 2);
    } else if (method === 'POST') {
      status = 201;
      statusText = 'Created';
      responseHeaders['Content-Type'] = 'application/json';
      
      let parsedBody = { nome: "Novo Usuário", cargo: "Estagiário" };
      try { parsedBody = JSON.parse(body); } catch(e){}
      
      responseBody = JSON.stringify({
        id: Math.floor(Math.random() * 100) + 3,
        ...parsedBody,
        criadoEm: new Date().toISOString()
      }, null, 2);
    } else if (method === 'OPTIONS') {
      status = 204;
      statusText = 'No Content';
      responseHeaders['Allow'] = 'GET, POST, OPTIONS, HEAD';
      responseHeaders['Access-Control-Allow-Origin'] = '*';
      responseHeaders['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, HEAD';
      responseBody = '';
    } else if (method === 'HEAD') {
      status = 200;
      statusText = 'OK';
      responseHeaders['Content-Type'] = 'application/json';
      // Content-Length matches what a GET would return
      responseHeaders['Content-Length'] = '154'; 
      responseBody = ''; // MUST be empty for HEAD
    } else {
      status = 405;
      statusText = 'Method Not Allowed';
      responseHeaders['Allow'] = 'GET, POST, OPTIONS, HEAD';
      responseBody = JSON.stringify({ error: `Método ${method} não é suportado para /usuarios` });
    }
  } else if (path.startsWith('/usuarios/')) {
    const id = path.split('/')[2];
    
    if (id === '1') {
      if (method === 'GET') {
        status = 200;
        statusText = 'OK';
        responseHeaders['Content-Type'] = 'application/json';
        responseBody = JSON.stringify({ id: 1, nome: "Lucas Souza", cargo: "Dev Backend" }, null, 2);
      } else if (method === 'PUT') {
        status = 200;
        statusText = 'OK';
        responseHeaders['Content-Type'] = 'application/json';
        
        let parsedBody = {};
        try { parsedBody = JSON.parse(body); } catch(e){}
        
        responseBody = JSON.stringify({ id: 1, ...parsedBody }, null, 2);
      } else if (method === 'PATCH') {
        status = 200;
        statusText = 'OK';
        responseHeaders['Content-Type'] = 'application/json';
        
        let parsedBody = {};
        try { parsedBody = JSON.parse(body); } catch(e){}
        
        responseBody = JSON.stringify({
          id: 1,
          nome: parsedBody.nome || "Lucas Souza",
          cargo: parsedBody.cargo || "Dev Backend",
          editadoEm: new Date().toISOString()
        }, null, 2);
      } else if (method === 'DELETE') {
        status = 204;
        statusText = 'No Content';
        // 204 does not return content-type or body
        responseBody = '';
      } else if (method === 'HEAD') {
        status = 200;
        statusText = 'OK';
        responseHeaders['Content-Type'] = 'application/json';
        responseHeaders['Content-Length'] = '78';
        responseBody = '';
      } else {
        status = 405;
        statusText = 'Method Not Allowed';
        responseHeaders['Allow'] = 'GET, PUT, PATCH, DELETE, HEAD';
        responseBody = JSON.stringify({ error: `Método ${method} não suportado para /usuarios/:id` });
      }
    } else {
      // User id does not exist
      status = 404;
      statusText = 'Not Found';
      responseHeaders['Content-Type'] = 'application/json';
      responseBody = JSON.stringify({ error: `Usuário com ID ${id} não foi encontrado.` }, null, 2);
    }
  } else {
    // 404 Route Not Found
    status = 404;
    statusText = 'Not Found';
    responseHeaders['Content-Type'] = 'application/json';
    responseBody = JSON.stringify({ error: `Caminho '${path}' não existe neste servidor.` }, null, 2);
  }

  // 3. Format Raw HTTP Response
  if (responseBody) {
    responseHeaders['Content-Length'] = responseBody.length;
  }

  let rawResponse = `HTTP/1.1 ${status} ${statusText}\n`;
  for (const [key, value] of Object.entries(responseHeaders)) {
    rawResponse += `${key}: ${value}\n`;
  }
  rawRequest += `\n`;
  
  if (method === 'HEAD') {
    rawResponse += `\n[O método HEAD oculta o corpo da resposta no cliente, embora os cabeçalhos acima reflitam os metadados do recurso]`;
  } else if (responseBody) {
    rawResponse += `\n${responseBody}`;
  }

  rawResponseOutput.textContent = rawResponse;

  // 4. Update Status Badge
  responseStatusBadge.textContent = `${status} ${statusText}`;
  responseStatusBadge.className = 'response-status'; // Reset classes
  if (status >= 200 && status < 300) {
    responseStatusBadge.classList.add(status === 204 ? 'status-204' : (status === 201 ? 'status-201' : 'status-200'));
  } else {
    responseStatusBadge.classList.add(status === 404 ? 'status-404' : 'status-400');
  }
}

// Initialize presentation state
updateSlides();
// Run initial mock request to populate playground
simulateHTTPRequest();
