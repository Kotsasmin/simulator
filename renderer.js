const spriteDefinitions = [
  { x: 0, y: 0, name: 'void', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 2, y: 11, name: 'fatBlock', bgColor: '#000000', spriteColor: '#FFFFFF' },


  //Letters
  { x: 1, y: 4, name: 'A', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 2, y: 4, name: 'B', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 3, y: 4, name: 'C', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 4, y: 4, name: 'D', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 5, y: 4, name: 'E', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 6, y: 4, name: 'F', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 7, y: 4, name: 'G', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 8, y: 4, name: 'H', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 9, y: 4, name: 'I', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 10, y: 4, name: 'J', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 11, y: 4, name: 'K', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 12, y: 4, name: 'L', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 13, y: 4, name: 'M', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 14, y: 4, name: 'N', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 15, y: 4, name: 'O', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 0, y: 5, name: 'P', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 1, y: 5, name: 'Q', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 2, y: 5, name: 'R', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 3, y: 5, name: 'S', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 4, y: 5, name: 'T', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 5, y: 5, name: 'U', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 6, y: 5, name: 'V', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 7, y: 5, name: 'W', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 8, y: 5, name: 'X', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 9, y: 5, name: 'Y', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 10, y: 5, name: 'Z', bgColor: '#000000', spriteColor: '#FFFFFF' },

  { x: 1, y: 6, name: 'a', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 2, y: 6, name: 'b', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 3, y: 6, name: 'c', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 4, y: 6, name: 'd', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 5, y: 6, name: 'e', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 6, y: 6, name: 'f', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 7, y: 6, name: 'g', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 8, y: 6, name: 'h', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 9, y: 6, name: 'i', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 10, y:6, name: 'j', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 11, y:6, name: 'k', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 12, y: 6, name: 'l', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 13, y: 6, name: 'm', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 14, y: 6, name: 'n', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 15, y: 6, name: 'o', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 0, y: 7, name: 'p', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 1, y: 7, name: 'q', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 2, y: 7, name: 'r', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 3, y: 7, name: 's', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 4, y: 7, name: 't', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 5, y: 7, name: 'u', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 6, y: 7, name: 'v', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 7, y: 7, name: 'w', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 8, y: 7, name: 'x', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 9, y: 7, name: 'y', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 10, y: 7, name: 'z', bgColor: '#000000', spriteColor: '#FFFFFF' },

  //Numbers

  { x: 0, y: 3, name: '0', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 1, y: 3, name: '1', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 2, y: 3, name: '2', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 3, y: 3, name: '3', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 4, y: 3, name: '4', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 5, y: 3, name: '5', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 6, y: 3, name: '6', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 7, y: 3, name: '7', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 8, y: 3, name: '8', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 9, y: 3, name: '9', bgColor: '#000000', spriteColor: '#FFFFFF' },

  //Dwarves
  { x: 1, y: 0, name: 'dwarfWhite', bgColor: '#000000', spriteColor: '#FFFFFF' },
  { x: 1, y: 0, name: 'dwarfYellow', bgColor: '#000000', spriteColor: '#fff200' },
  { x: 1, y: 0, name: 'dwarfBlue', bgColor: '#000000', spriteColor: '#0d00ff' },
  { x: 1, y: 0, name: 'dwarfGreen', bgColor: '#000000', spriteColor: '#00ff4c' },
  { x: 1, y: 0, name: 'dwarfGrey', bgColor: '#000000', spriteColor: '#919191' },


  //Livestock
  { x: 4, y: 6, name: 'dog', bgColor: '#000000', spriteColor: '#753300' },
  { x: 3, y: 6, name: 'cat', bgColor: '#000000', spriteColor: '#666666' },
  { x: 5, y: 6, name: 'elephant', bgColor: '#000000', spriteColor: '#969696' },
  { x: 2, y: 6, name: 'bird', bgColor: '#000000', spriteColor: '#ebebeb' },
  { x: 0, y: 7, name: 'pig', bgColor: '#000000', spriteColor: '#f833ff' },

  //Nature
  { x: 12, y: 2, name: 'grass', bgColor: '#000000', spriteColor: '#00ff26' },
  { x: 7, y: 2, name: 'tallGrass', bgColor: '#000000', spriteColor: '#04d123' },
  { x: 15, y: 4, name: 'trunk', bgColor: '#000000', spriteColor: '#8a5500' },
  { x: 7, y: 15, name: 'sea', bgColor: '#000000', spriteColor: '#0400ff' },




];

class Renderer {
  constructor(canvasId, tilesetPath, tileWidth = 16, tileHeight = 16, scaleFactor = 1) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.tileWidth = tileWidth; 
    this.tileHeight = tileHeight; 
    this.scaleFactor = scaleFactor; 
    this.TILES_PER_ROW = 16; 
    this.sprites = {}; 

    this.tilesetImage = new Image();
    this.tilesetImage.src = tilesetPath;
    
  }

  initialize(callback) {
    this.tilesetImage.onload = () => {
      this.defineSprites(); 
      callback();
    };
  }

  defineSprites() {
    spriteDefinitions.forEach(({ x, y, name, bgColor, spriteColor }) => {
      if (!this.sprites[name]) { 
        this.defineSprite(x, y, name, bgColor, spriteColor);
      } else {
        console.warn(`Sprite "${name}" already defined. Skipping.`);
      }
    });
  }

  defineSprite(x, y, name, bgColor = '#000000', spriteColor = '#FFFFFF') {

    if (this.sprites[name]) {
      console.warn(`Sprite "${name}" already defined. Skipping.`);
      return; 
    }

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = this.tileWidth;
    offscreenCanvas.height = this.tileHeight;
    const offscreenCtx = offscreenCanvas.getContext('2d');

    const sourceX = x * this.tileWidth;
    const sourceY = y * this.tileHeight;

    offscreenCtx.drawImage(
      this.tilesetImage,
      sourceX,
      sourceY,
      this.tileWidth,
      this.tileHeight,
      0,
      0,
      this.tileWidth,
      this.tileHeight
    );

    const imageData = offscreenCtx.getImageData(0, 0, this.tileWidth, this.tileHeight);
    const data = imageData.data;

    const purple = { r: 255, g: 0, b: 255 }; 
    const white = { r: 255, g: 255, b: 255 }; 

    const newBgColor = this.hexToRgb(bgColor);
    const newSpriteColor = this.hexToRgb(spriteColor);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (r === purple.r && g === purple.g && b === purple.b) {
        data[i] = newBgColor.r;
        data[i + 1] = newBgColor.g;
        data[i + 2] = newBgColor.b;
      }

      if (r === white.r && g === white.g && b === white.b) {
        data[i] = newSpriteColor.r;
        data[i + 1] = newSpriteColor.g;
        data[i + 2] = newSpriteColor.b;
      }
    }

    offscreenCtx.putImageData(imageData, 0, 0);

    this.sprites[name] = offscreenCanvas;
  }

  renderSprite(name, gridX, gridY) {
    if (this.sprites[name]) {

      const pixelX = gridX * this.tileWidth * this.scaleFactor; 
      const pixelY = gridY * this.tileHeight * this.scaleFactor; 

      const scaledWidth = this.tileWidth * this.scaleFactor;
      const scaledHeight = this.tileHeight * this.scaleFactor;

      this.ctx.drawImage(this.sprites[name], pixelX, pixelY, scaledWidth, scaledHeight);
    } else {
      console.error(`Sprite "${name}" not found.`);
    }
  }

  hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }
}