// Set up the renderer
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

function clear(){


    for (let i =0; i<94; i++){
      for (let j=0; j<33; j++){
        renderer.renderSprite('void', i, j);
      }
    }
    renderCorners();


}


function started() {
  console.log('Game started!');
  clear();

  //generating see
  for (let i =0; i<94; i++){
    for (let j=0; j<33; j++){
      renderer.renderSprite('sea', i, j);
    }
  }
  renderCorners();
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
