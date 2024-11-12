const renderer = new Renderer('canvas', 'tileset.png', 8, 12, 1);

function renderCorners() {
  renderer.renderSprite('trunk', 0, 0);
  renderer.renderSprite('trunk', 93, 0);
  renderer.renderSprite('trunk', 93, 32);
  renderer.renderSprite('trunk', 0, 32);
}

function renderLogo() {
  renderer.renderSprite('W', 42, 9);
  renderer.renderSprite('O', 43, 9);
  renderer.renderSprite('R', 44, 9);
  renderer.renderSprite('L', 45, 9);
  renderer.renderSprite('D', 46, 9);
  renderer.renderSprite('G', 40, 10);
  renderer.renderSprite('E', 41, 10);
  renderer.renderSprite('N', 42, 10);
  renderer.renderSprite('E', 43, 10);
  renderer.renderSprite('R', 44, 10);
  renderer.renderSprite('A', 45, 10);
  renderer.renderSprite('T', 46, 10);
  renderer.renderSprite('O', 47, 10);
  renderer.renderSprite('R', 48, 10);
}

function renderCredits() {
  renderer.renderSprite('K', 2, 31);
  renderer.renderSprite('O', 3, 31);
  renderer.renderSprite('T', 4, 31);
  renderer.renderSprite('S', 5, 31);
  renderer.renderSprite('A', 6, 31);
  renderer.renderSprite('S', 7, 31);
  renderer.renderSprite('M', 8, 31);
  renderer.renderSprite('I', 9, 31);
  renderer.renderSprite('N', 10, 31);
}

function renderButtons() {
  renderer.renderSprite('G', 39, 16);
  renderer.renderSprite('e', 40, 16);
  renderer.renderSprite('n', 41, 16);
  renderer.renderSprite('e', 42, 16);
  renderer.renderSprite('r', 43, 16);
  renderer.renderSprite('a', 44, 16);
  renderer.renderSprite('t', 45, 16);
  renderer.renderSprite('e', 46, 16);
  renderer.renderSprite('n', 48, 16);
  renderer.renderSprite('o', 49, 16);
  renderer.renderSprite('w', 50, 16);
}

function clear() {
  for (let i = 0; i < 94; i++) {
    for (let j = 0; j < 33; j++) {
      renderer.renderSprite('void', i, j);
    }
  }
  renderCorners();
}

function renderSea() {
  for (let i = 0; i < 94; i++) {
    for (let j = 0; j < 33; j++) {
      renderer.renderSprite('sea', i, j);
    }
  }
  renderCorners();
}

function started() {
  console.log('Simulation started!');
  clear();
  renderSea();
  startWaveEngine();
}

let activeWaves = []; 

function startWaveEngine() {
  const delay = 200;

  function generateWave() {

    let x, y;
    const edge = Math.floor(Math.random() * 4); 
    if (edge === 0) { x = 0; y = Math.floor(Math.random() * 33); } 
    else if (edge === 1) { x = 93; y = Math.floor(Math.random() * 33); } 
    else if (edge === 2) { x = Math.floor(Math.random() * 94); y = 0; } 
    else { x = Math.floor(Math.random() * 94); y = 32; } 

    let waveRadius = 1;
    const waveId = `wave_${new Date().getTime()}_${Math.random()}`; 
    activeWaves.push({ id: waveId, x, y, radius: waveRadius, cycle: Math.random() }); 

    const waveInterval = setInterval(() => {
      expandWave(x, y, waveRadius, waveId);
      waveRadius++;
      if (waveRadius > 15) clearInterval(waveInterval); 
    }, delay);
  }

  function expandWave(centerX, centerY, radius, waveId) {

    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {

        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > radius - 1 && distance <= radius) {
          const x = centerX + dx;
          const y = centerY + dy;

          if (x >= 0 && x < 94 && y >= 0 && y < 33) {

            for (let wave of activeWaves) {
              if (wave.id !== waveId && wave.cycle !== activeWaves.find(w => w.id === waveId).cycle) {
                const distanceToWave = Math.sqrt(Math.pow(wave.x - x, 2) + Math.pow(wave.y - y, 2));
                if (distanceToWave <= 2) { 
                  renderer.renderSprite('lightMist', x, y); 
                  setTimeout(() => renderer.renderSprite('sea', x, y), 1500); 
                }
              }
            }
            renderer.renderSprite('wave', x, y);
            setTimeout(() => renderer.renderSprite('sea', x, y), 1500); 
          }
        }
      }
    }
  }

  setInterval(generateWave, delay * 10); 
}

renderer.initialize(() => {
  renderLogo();
  renderCredits();
  renderButtons();
  renderCorners(); 

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      started();
    }
  });
});