const renderer = new Renderer('canvas', 'tileset.png', 8, 12, 1);

// Function to render corners
function renderCorners() {
  renderer.renderSprite('trunk', 0, 0);
  renderer.renderSprite('trunk', 93, 0);
  renderer.renderSprite('trunk', 93, 32);
  renderer.renderSprite('trunk', 0, 32);
}

// Function to render the logo
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

// Function to render credits
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

// Function to render buttons
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

let activeWaves = []; // Store all active waves

function startWaveEngine() {
  const delay = 400;

  function generateWave() {
    // Select a random starting point along the borders
    let x, y;
    const edge = Math.floor(Math.random() * 4); // Choose a random edge
    if (edge === 0) { x = 0; y = Math.floor(Math.random() * 33); } // Left edge
    else if (edge === 1) { x = 93; y = Math.floor(Math.random() * 33); } // Right edge
    else if (edge === 2) { x = Math.floor(Math.random() * 94); y = 0; } // Top edge
    else { x = Math.floor(Math.random() * 94); y = 32; } // Bottom edge

    let waveRadius = 1;
    const waveId = `wave_${new Date().getTime()}_${Math.random()}`; // Unique identifier for the wave
    activeWaves.push({ id: waveId, x, y, radius: waveRadius, cycle: Math.random() }); // Store wave with unique cycle identifier

    const waveInterval = setInterval(() => {
      expandWave(x, y, waveRadius, waveId);
      waveRadius++;
      if (waveRadius > 15) clearInterval(waveInterval); // Stop after 15 radius expansion
    }, delay);
  }

  function expandWave(centerX, centerY, radius, waveId) {
    // Control wave "thickness" by adjusting the condition that defines the area of the wave.
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        // Calculate the diagonal distance to create a thinner wave
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > radius - 1 && distance <= radius) {
          const x = centerX + dx;
          const y = centerY + dy;

          if (x >= 0 && x < 94 && y >= 0 && y < 33) {
            // Check for collision with waves from different cycles
            // Doesn't work, needs fix IDK
            for (let wave of activeWaves) {
              if (wave.id !== waveId && wave.cycle !== activeWaves.find(w => w.id === waveId).cycle) {
                const distanceToWave = Math.sqrt(Math.pow(wave.x - x, 2) + Math.pow(wave.y - y, 2));
                if (distanceToWave <= 2) { // Collision threshold (2 block distance)
                  renderer.renderSprite('lightMist', x, y); // Show light mist on collision
                  setTimeout(() => renderer.renderSprite('sea', x, y), 1500); // Revert to sea after 1.5 seconds
                }
              }
            }
            renderer.renderSprite('wave', x, y);
            setTimeout(() => renderer.renderSprite('sea', x, y), 1500); // Revert to sea after a delay
          }
        }
      }
    }
  }

  // Keep generating waves in intervals
  setInterval(generateWave, delay * 10); // New wave every 5 seconds
}

renderer.initialize(() => {
  renderLogo();
  renderCredits();
  renderButtons();
  renderCorners(); // Always render trunks in corners

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      started();
    }
  });
});
