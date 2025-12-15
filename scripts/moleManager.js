import {
  canvas,
  ctx,
  lifeReduce,
  parentGrid,
  ScoreModifier,
} from "./gameManager.js";

export const groundImage = new Image();
groundImage.src = "./sprites/ground.png";

export const moleImage = new Image();
moleImage.src = "./sprites/mole.png";

// Hit sound effect
const hitSound = new Audio("./sounds/Hit.m4a");
hitSound.volume = 0.7; // Set volume to 70%
hitSound.preload = "auto"; // Preload the audio

let row = 3;
let col = 3;

let cells = [];
let size = 0;
let isMolehitten = false;
let lastMoleRow = -1;
let lastMoleCol = -1;
export const CreateMolesGridCell = () => {
  const cellSize = parentGrid.size / row;
  cells = [];
  lastMoleRow = -1;
  lastMoleCol = -1;
  for (let i = 0; i < row; i++) {
    cells[i] = [];
    for (let j = 0; j < col; j++) {
      let child = new Cell(
        parentGrid.left + size,
        parentGrid.top + i * cellSize,
        cellSize
      );

      child.groundImg = groundImage;
      child.moleImg = moleImage;

      // cells.push(child);
      cells[i][j] = child;
      size += cellSize;

      console.log(
        `row ${i} col ${j} x=${child.x} y=${child.y} size=${child.size}`
      );
    }
    size = 0;
  }
};

export const DrawMoleGridCells = () => {
  if (cells.length == 0) {
    CreateMolesGridCell();
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let c = cells[i][j];
      let groundHeight = c.size / 3;
      let groundY = c.y + c.size - groundHeight;

      // Draw ground
      if (c.groundImg && c.groundImg.complete) {
        ctx.drawImage(c.groundImg, c.x, groundY, c.size, groundHeight);
      }

      // Draw mole
      if (c.showMole && c.moleImg && c.moleImg.complete) {
        ctx.drawImage(c.moleImg, c.x, c.y, c.size, c.size);
      }
    }
  }
};

let moleTimer = 0;
const moleInterval = 1000;

export const DrawRandomMole = (dt) => {
  moleTimer += dt;

  if (moleTimer >= moleInterval) {
    moleTimer = 0;

    if (isMolehitten) {
      ScoreModifier(1);
    } else {
      lifeReduce();
    }

    ActiveOneMole();
  }
};

const ActiveOneMole = () => {
  let r, c;
  
  // Ensure next mole is not at the same position as the last one
  do {
    r = Math.floor(Math.random() * row);
    c = Math.floor(Math.random() * col);
  } while (r === lastMoleRow && c === lastMoleCol && lastMoleRow !== -1);

  // hide all moles first
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      cells[i][j].showMole = false;
    }
  }

  // show mole at random cell
  cells[r][c].showMole = true;
  
  // Track this position for next time
  lastMoleRow = r;
  lastMoleCol = c;
  
  isMolehitten = false;
};

export const onCanvasClick = (e) => {
  const rect = canvas.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  CheckMoleHit(mouseX, mouseY);
};

const CheckMoleHit = (mouseX, mouseY) => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const cell = cells[i][j];

      if (!cell.showMole) continue;

      if (
        mouseX >= cell.x &&
        mouseX <= cell.x + cell.size &&
        mouseY >= cell.y &&
        mouseY <= cell.y + cell.size
      ) {
        KillMole(cell);
        return;
      }
    }
  }
};

const KillMole = (cell) => {
  isMolehitten = true;
  cell.showMole = false;
  
  // Play hit sound
  if (hitSound) {
    // Reset audio to start and play
    hitSound.currentTime = 0;
    hitSound.play().catch(error => {
      // Handle autoplay restrictions (browsers may block autoplay)
      console.log("Sound play failed:", error);
    });
  }
  
  console.log("score ++");
};
class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.groundImg = null;
    this.moleImg = null;
    this.showMole = false;
  }
}
