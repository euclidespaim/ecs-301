fetch('http://localhost:3000/agentes')
  .then(r => r.json())
  .then(console.log);