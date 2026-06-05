const renderer = new Renderer("canvas", "tileset.png", 8, 12, 1);

const WORLD_WIDTH = 500;
const WORLD_HEIGHT = 500;

let mapGrid = [];
let waves = [];
let mists = [];
let waveGrid = [];
let waveSpawnTimer = 0;
let simulationInterval = null;

let noiseOffsetX = 0;
let noiseOffsetY = 0;
let cameraX = 0;
let cameraY = 0;

function renderCorners() {
  const w = renderer.gridWidth - 1;
  const h = renderer.gridHeight - 1;
  renderer.renderSprite("trunk", 0, 0);
  renderer.renderSprite("trunk", w, 0);
  renderer.renderSprite("trunk", w, h);
  renderer.renderSprite("trunk", 0, h);
}

function renderLogo() {
  const cx = Math.floor(renderer.gridWidth / 2) - 4;
  renderer.renderSprite("W", cx, 9);
  renderer.renderSprite("O", cx + 1, 9);
  renderer.renderSprite("R", cx + 2, 9);
  renderer.renderSprite("L", cx + 3, 9);
  renderer.renderSprite("D", cx + 4, 9);
  renderer.renderSprite("G", cx - 2, 10);
  renderer.renderSprite("E", cx - 1, 10);
  renderer.renderSprite("N", cx, 10);
  renderer.renderSprite("E", cx + 1, 10);
  renderer.renderSprite("R", cx + 2, 10);
  renderer.renderSprite("A", cx + 3, 10);
  renderer.renderSprite("T", cx + 4, 10);
  renderer.renderSprite("O", cx + 5, 10);
  renderer.renderSprite("R", cx + 6, 10);
}

function renderCredits() {
  renderer.renderSprite("K", 2, renderer.gridHeight - 2);
  renderer.renderSprite("O", 3, renderer.gridHeight - 2);
  renderer.renderSprite("T", 4, renderer.gridHeight - 2);
  renderer.renderSprite("S", 5, renderer.gridHeight - 2);
  renderer.renderSprite("A", 6, renderer.gridHeight - 2);
  renderer.renderSprite("S", 7, renderer.gridHeight - 2);
  renderer.renderSprite("M", 8, renderer.gridHeight - 2);
  renderer.renderSprite("I", 9, renderer.gridHeight - 2);
  renderer.renderSprite("N", 10, renderer.gridHeight - 2);
}

function renderButtons() {
  const cx = Math.floor(renderer.gridWidth / 2) - 5;
  renderer.renderSprite("G", cx, 16);
  renderer.renderSprite("e", cx + 1, 16);
  renderer.renderSprite("n", cx + 2, 16);
  renderer.renderSprite("e", cx + 3, 16);
  renderer.renderSprite("r", cx + 4, 16);
  renderer.renderSprite("a", cx + 5, 16);
  renderer.renderSprite("t", cx + 6, 16);
  renderer.renderSprite("e", cx + 7, 16);
  renderer.renderSprite("n", cx + 9, 16);
  renderer.renderSprite("o", cx + 10, 16);
  renderer.renderSprite("w", cx + 11, 16);
}

function clear() {
  for (let i = 0; i < renderer.gridWidth; i++) {
    for (let j = 0; j < renderer.gridHeight; j++) {
      renderer.renderSprite("void", i, j);
    }
  }
  renderCorners();
}

function generateWorld() {
  noiseOffsetX = Math.random() * 10000;
  noiseOffsetY = Math.random() * 10000;

  mapGrid = new Array(WORLD_WIDTH)
    .fill(null)
    .map(() => new Array(WORLD_HEIGHT).fill("sea"));
  waveGrid = new Array(WORLD_WIDTH)
    .fill(null)
    .map(() => new Array(WORLD_HEIGHT).fill(null));

  for (let x = 0; x < WORLD_WIDTH; x++) {
    for (let y = 0; y < WORLD_HEIGHT; y++) {
      let nx = x / 15 + noiseOffsetX;
      let ny = y / 15 + noiseOffsetY;

      let noise =
        Math.sin(nx * 3) * 4 +
        Math.sin(ny * 4) * 3 +
        Math.sin((nx + ny) * 2) * 4;

      let gradient = (WORLD_WIDTH * 0.15 - x) * 0.5;
      let elevation = noise + gradient;

      if (elevation > 16) {
        mapGrid[x][y] = "mountain";
      } else if (elevation > 12) {
        mapGrid[x][y] = "hill";
      } else if (elevation > 6) {
        let vegNoise = Math.sin(nx * 20) + Math.cos(ny * 20);
        if (vegNoise > 1.2) mapGrid[x][y] = "tree1";
        else if (vegNoise > 0.8) mapGrid[x][y] = "tree2";
        else if (vegNoise > 0.4) mapGrid[x][y] = "shrub1";
        else if (vegNoise > 0.1) mapGrid[x][y] = "shrub2";
        else if (vegNoise > -0.2) mapGrid[x][y] = "flowerWhite";
        else if (vegNoise > -0.5) mapGrid[x][y] = "flowerYellow";
        else mapGrid[x][y] = "tallGrass";
      } else if (elevation > 2) {
        let vegNoise2 = Math.sin(nx * 30) + Math.cos(ny * 30);
        if (vegNoise2 > 1.5) mapGrid[x][y] = "boulder1";
        else if (vegNoise2 > 1.2) mapGrid[x][y] = "boulder2";
        else if (vegNoise2 > 0.9) mapGrid[x][y] = "boulder3";
        else mapGrid[x][y] = Math.random() < 0.3 ? "tallGrass" : "grass";
      } else if (elevation > 0) {
        mapGrid[x][y] = "sand";
      } else {
        mapGrid[x][y] = "sea";
      }
    }
  }
}

class WaveParticle {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.state = "moving";
    this.moveCounter = Math.floor(Math.random() * 2);
  }

  getColor() {
    let distanceToCoast = this.x - WORLD_WIDTH * 0.15;
    if (distanceToCoast > 80) return "waveBlue";
    if (distanceToCoast > 40) return "waveLightBlue";
    if (distanceToCoast > 15) return "waveCyan";
    return "waveWhite";
  }
}

class MistParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.timer = 0;
  }
}

function spawnWaveGroup() {
  const vpW = renderer.gridWidth;
  const vpH = renderer.gridHeight;

  let spawnX =
    Math.floor(WORLD_WIDTH * 0.15) +
    10 +
    Math.floor(Math.random() * (vpW + 20));
  let spawnY = Math.floor(Math.random() * vpH) + cameraY;

  spawnX = Math.max(0, Math.min(spawnX, WORLD_WIDTH - 1));
  spawnY = Math.max(0, Math.min(spawnY, WORLD_HEIGHT - 1));

  if (mapGrid[spawnX][spawnY] !== "sea") return;

  let dx = 0,
    dy = 0;
  let randDir = Math.random();
  if (randDir < 0.6) {
    dx = -1;
    dy = 0;
  } else if (randDir < 0.8) {
    dx = 0;
    dy = -1;
  } else {
    dx = 0;
    dy = 1;
  }

  let length = 5 + Math.floor(Math.random() * 15);
  let currentX = spawnX;
  let currentY = spawnY;

  for (let i = 0; i < length; i++) {
    if (dx !== 0) {
      currentY += 1;
      if (Math.random() < 0.3) currentX += Math.random() < 0.5 ? 1 : -1;
    } else {
      currentX += 1;
      if (Math.random() < 0.3) currentY += Math.random() < 0.5 ? 1 : -1;
    }

    if (
      currentX >= 0 &&
      currentX < WORLD_WIDTH &&
      currentY >= 0 &&
      currentY < WORLD_HEIGHT
    ) {
      if (mapGrid[currentX][currentY] === "sea") {
        waves.push(new WaveParticle(currentX, currentY, dx, dy));
      }
    }
  }
}

function spawnMistExplosion(x, y) {
  const points = [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [2, 0],
    [-2, 0],
    [0, 2],
    [0, -2],
  ];
  for (let p of points) {
    let mx = x + p[0];
    let my = y + p[1];
    if (mx >= 0 && mx < WORLD_WIDTH && my >= 0 && my < WORLD_HEIGHT) {
      if (
        mapGrid[mx][my] === "sea" ||
        mapGrid[mx][my] === "sand" ||
        mapGrid[mx][my] === "grass"
      ) {
        mists.push(new MistParticle(mx, my));
      }
    }
  }
}

function tickEngine() {
  waveSpawnTimer++;
  if (waveSpawnTimer > 6) {
    spawnWaveGroup();
    waveSpawnTimer = 0;
  }

  let newWaves = [];

  for (let w of waves) {
    waveGrid[w.x][w.y] = null;
  }

  for (let wv of waves) {
    wv.moveCounter++;
    if (wv.moveCounter >= 2) {
      wv.moveCounter = 0;

      let nextX = wv.x + wv.dx;
      let nextY = wv.y + wv.dy;

      if (
        nextX < 0 ||
        nextX >= WORLD_WIDTH ||
        nextY < 0 ||
        nextY >= WORLD_HEIGHT
      )
        continue;

      let terrain = mapGrid[nextX][nextY];
      if (terrain !== "sea") {
        spawnMistExplosion(nextX, nextY);
        continue;
      }

      if (waveGrid[nextX][nextY] !== null) {
        let otherWv = waveGrid[nextX][nextY];
        if (otherWv.dx !== wv.dx || otherWv.dy !== wv.dy) {
          spawnMistExplosion(nextX, nextY);
          continue;
        }
      }

      wv.x = nextX;
      wv.y = nextY;
    }
    waveGrid[wv.x][wv.y] = wv;
    newWaves.push(wv);
  }
  waves = newWaves;

  let newMists = [];
  for (let m of mists) {
    m.timer++;
    if (m.timer < 6) newMists.push(m);
  }
  mists = newMists;

  renderFrame();
}

function renderFrame() {
  const w = renderer.gridWidth;
  const h = renderer.gridHeight;

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let wx = cameraX + x;
      let wy = cameraY + y;

      if (wx >= 0 && wx < WORLD_WIDTH && wy >= 0 && wy < WORLD_HEIGHT) {
        renderer.renderSprite(mapGrid[wx][wy], x, y);
      } else {
        renderer.renderSprite("void", x, y);
      }
    }
  }

  for (let wv of waves) {
    let sx = wv.x - cameraX;
    let sy = wv.y - cameraY;
    if (sx >= 0 && sx < w && sy >= 0 && sy < h) {
      renderer.renderSprite(wv.getColor(), sx, sy);
    }
  }

  for (let m of mists) {
    let sx = m.x - cameraX;
    let sy = m.y - cameraY;
    if (sx >= 0 && sx < w && sy >= 0 && sy < h) {
      if (m.timer <= 2) renderer.renderSprite("lightMist", sx, sy);
      else if (m.timer <= 4) renderer.renderSprite("foamGrey", sx, sy);
      else renderer.renderSprite("lightMist", sx, sy);
    }
  }

  renderCorners();
}

function started() {
  console.log("Simulation started!");
  if (simulationInterval) clearInterval(simulationInterval);
  waves = [];
  mists = [];
  waveSpawnTimer = 0;
  renderer.resize();

  cameraX = Math.max(
    0,
    Math.floor(WORLD_WIDTH * 0.15) - Math.floor(renderer.gridWidth / 3),
  );
  cameraY = Math.floor(WORLD_HEIGHT / 2) - Math.floor(renderer.gridHeight / 2);

  simulationInterval = setInterval(tickEngine, 100);
}

window.addEventListener("resize", () => {
  renderer.resize();
  if (simulationInterval) {
    renderFrame();
  } else {
    renderer.initialize(() => {
      clear();
      renderLogo();
      renderCredits();
      renderButtons();
      renderCorners();
    });
  }
});

renderer.initialize(() => {
  generateWorld();

  renderLogo();
  renderCredits();
  renderButtons();
  renderCorners();

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      if (!simulationInterval) {
        started();
      }
    }
  });
});
