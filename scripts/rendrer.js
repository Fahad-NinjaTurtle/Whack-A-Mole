import {
  canvas,
  ctx,
  drawGridParent,
  gameOver,
  isGameRunning,
  lifes,
  score,
} from "./gameManager.js";
import { DrawMoleGridCells, DrawRandomMole } from "./moleManager.js";

let timerBg = new Image();
timerBg.src = "./sprites/timerbg.png";

let timeFiller = new Image();
timeFiller.src = "./sprites/timerFiller.png";

let totalTime = 1000 * 60;
let remainingTime = totalTime;
let timerWidth = 500;
export const Draw = (dt) => {
  if (!isGameRunning) {
    // Clear canvas when game is not running
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGridParent();
  DrawMoleGridCells();
  DrawRandomMole(dt);
  DrawScore();
  DrawLives();
  DrawTimer();
  ReduceTime(dt);
};

const DrawScore = () => {
  if (isGameRunning) {
    const fontSize = Math.max(20, canvas.width / 32);
    const padding = Math.max(20, canvas.width * 0.02);
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = "#022d11";
    const text = "Score : " + score;
    ctx.fillText(text, padding, fontSize + padding);
  }
};

const DrawLives = () => {
  if (isGameRunning) {
    const fontSize = Math.max(20, canvas.width / 32);
    const padding = Math.max(20, canvas.width * 0.02);
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = "#022d11";
    const text = "Lives : " + lifes;
    ctx.fillText(text, padding, fontSize * 2.5 + padding);
  }
};

const DrawTimer = () => {
  if (!isGameRunning) return; // Don't draw timer when game is over
  
  // Responsive timer width (60% of screen width, max 600px)
  const maxTimerWidth = Math.min(canvas.width * 0.6, 600);
  const currentTimerWidth = (remainingTime / totalTime) * maxTimerWidth;
  
  const x = (canvas.width - maxTimerWidth) / 2;
  const y = 10;
  const h = Math.max(25, canvas.height * 0.04); // Responsive height

  // background rounded bar
  ctx.fillStyle = "#7fbf6b";
  roundRect(ctx, x, y, maxTimerWidth, h, h / 2);
  ctx.fill();

  // foreground (remaining) bar
  if (currentTimerWidth > 0) {
    ctx.fillStyle = "#223a12";
    roundRect(ctx, x, y, currentTimerWidth, h, h / 2);
    ctx.fill();
  }

  // time text (responsive font size)
  const secondsLeft = Math.ceil(remainingTime / 1000);
  const fontSize = Math.max(16, canvas.width / 40);
  ctx.fillStyle = "white";
  ctx.font = `bold ${fontSize}px Arial`;
  const textWidth = ctx.measureText(secondsLeft + "s").width;
  ctx.fillText(secondsLeft + "s", canvas.width / 2 - textWidth / 2, y + h / 2 + fontSize / 3);
};

// perfect rounded rectangle function
const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};

const ReduceTime = (dt) => {
  if (!isGameRunning) return;
  
  if (remainingTime > 0) {
    remainingTime -= dt;
  } else {
    remainingTime = 0;
    gameOver();
  }
};

timerBg.onload = () => {
  console.log("timer image loaded");
};
timeFiller.onload = () => {
  console.log("filler loaded");
};


export const ResetTimer = () => {
  remainingTime = totalTime;
}