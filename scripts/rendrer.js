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
    ctx.font = `${canvas.width / 32}px black`;
    ctx.fillStyle = "black";
    ctx.fillText("Score : " + score, 100, 100, 1000);
  }
};
const DrawLives = () => {
  if (isGameRunning) {
    ctx.font = `${canvas.width / 32}px black`;
    ctx.fillStyle = "black";
    ctx.fillText("Lives : " + lifes, 100, 200, 1000);
  }
};

const DrawTimer = () => {
  const x = (canvas.width - 500) / 2;
  const y = 10;
  const h = 30;

  // background rounded bar
  ctx.fillStyle = "#7fbf6b";
  roundRect(ctx, x, y, 500, h, 15);
  ctx.fill();

  // foreground (remaining) bar
  if (timerWidth > 0) {
    ctx.fillStyle = "#223a12";
    roundRect(ctx, x, y, timerWidth, h, 15);
    ctx.fill();
  }

  // time text
  const secondsLeft = Math.ceil(remainingTime / 1000);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(secondsLeft + "s", canvas.width / 2 - 10, y + 22);
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
  if (remainingTime > 0) {
    remainingTime -= dt;
    timerWidth = (remainingTime / totalTime) * 500;
  } else {
    remainingTime = totalTime;
    timerWidth = 500;
    gameOver();
  }
};

timerBg.onload = () => {
  console.log("timer image loaded");
};
timeFiller.onload = () => {
  console.log("filler loaded");
};


export const ResetTimer=()=>{
  remainingTime = totalTime;
  timerWidth = 500;
}