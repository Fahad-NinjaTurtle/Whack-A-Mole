import { CreateMolesGridCell, onCanvasClick } from "./moleManager.js";
import { Draw, ResetTimer } from "./rendrer.js";

/** @type {HTMLCanvasElement} */
export const canvas = document.getElementById("gameCanvas");

/** @type {CanvasRenderingContext2D} */
export const ctx = canvas.getContext("2d");
export let score = 0;
export let lifes = 4;
export let isGameRunning = false;

const startPanel = document.getElementById("startPanel");
const scorePanel = document.getElementById("scorePanel");
const startBtn = document.getElementById("startBtn");
const scoreValue = document.getElementById("scoreValue");
const highScoreValue = document.getElementById("highScoreValue");
const playAgainBtn = document.getElementById("playAgainBtn");
const homeBtn = document.getElementById("homeBtn");

/** High Score from localStorage **/
let highScore = Number(localStorage.getItem("moleHighScore")) || 0;
highScoreValue.textContent = highScore;

function resizeCanvas() {
  canvas.addEventListener("click", onCanvasClick);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  drawGridParent();
}

export const drawGridParent = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const screenW = canvas.width;
  const screenH = canvas.height;

  const allowedWidth = screenW * 0.4;
  const allowedHeight = screenH * 0.8;

  const squareSize = Math.min(allowedWidth, allowedHeight);

  const x = (screenW - squareSize) / 2;
  const y = (screenH - squareSize) / 2;

  ctx.fillStyle = "#AFE57F";
  ctx.fillRect(x, y, squareSize, squareSize);
  GridParentStats(x, y, squareSize);
};

export let parentGrid = { top: 0, left: 0, size: 0 };

export const GridParentStats = (x, y, squareSize) => {
  parentGrid.top = y;
  parentGrid.left = x;
  parentGrid.size = squareSize;
};

window.addEventListener("resize", resizeCanvas);

const startGame = () => {
  isGameRunning = true;
  score = 0;
  lifes = 4;
  ResetTimer();
  scoreValue.textContent = score;

  startPanel.style.display = "none";
  scorePanel.style.display = "none";

  resizeCanvas();
  CreateMolesGridCell();
};

export const gameOver = () => {
  isGameRunning = false;
  // update high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("moleHighScore", highScore);
  }
  highScoreValue.textContent = highScore;
  scoreValue.textContent = score;
  scorePanel.style.display = "flex";
};

export const lifeReduce = () => {
  if (!isGameRunning) return;

  lifes--;
  if (lifes <= 0) {
    gameOver();
  }
};
export const ScoreModifier = (s) => {
  if (!isGameRunning) return;

  score += s;
  scoreValue.textContent = score;
};
let lastTime = 0;
function loop(currentTime) {
  requestAnimationFrame(loop);

  if (!isGameRunning) {
    lastTime = currentTime;
    return;
  }

  const dt = currentTime - lastTime;
  lastTime = currentTime;
  Draw(dt);
}

requestAnimationFrame(loop);

startBtn.onclick = () => startGame();

playAgainBtn.onclick = () => {
  scorePanel.style.display = "none";

  startGame();
};
// startGame();
homeBtn.onclick = () => {
  scorePanel.style.display = "none";
  startPanel.style.display = "block";
};
