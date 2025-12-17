import { CreateMolesGridCell, onCanvasClick } from "./moleManager.js";
import { Draw, ResetTimer } from "./rendrer.js";

/** @type {HTMLCanvasElement} */
export const canvas = document.getElementById("gameCanvas");

/** @type {CanvasRenderingContext2D} */
export const ctx = canvas.getContext("2d");
export let score = 0;
export let lifes = 3;
export let isGameRunning = false;
let firstMissIgnored = false;

const startPanel = document.getElementById("startPanel");
const scorePanel = document.getElementById("scorePanel");
const missPanel = document.getElementById("missPanel");
const missMessage = document.getElementById("missMessage");
const resumeBtn = document.getElementById("resumeBtn");
const startBtn = document.getElementById("startBtn");
const scoreValue = document.getElementById("scoreValue");
const highScoreValue = document.getElementById("highScoreValue");
const playAgainBtn = document.getElementById("playAgainBtn");
const homeBtn = document.getElementById("homeBtn");

/** High Score from localStorage **/
let highScore = Number(localStorage.getItem("moleHighScore")) || 0;
highScoreValue.textContent = highScore;

// Add click listener once (not on every resize)
canvas.addEventListener("click", onCanvasClick);

function resizeCanvas() {
  // Use actual window dimensions or fullscreen dimensions
  const width = window.innerWidth || screen.width;
  const height = window.innerHeight || screen.height;
  
  canvas.width = width;
  canvas.height = height;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  drawGridParent();
  // Recreate mole grid so positions match new canvas size
  CreateMolesGridCell();
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

// Fullscreen functions
async function requestFullscreen() {
  const element = document.documentElement;
  
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      await element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      await element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      await element.mozRequestFullScreen();
    }
  } catch (error) {
    console.log("Fullscreen not available:", error);
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  }
}

// Handle fullscreen changes
document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("msfullscreenchange", handleFullscreenChange);
document.addEventListener("mozfullscreenchange", handleFullscreenChange);

function handleFullscreenChange() {
  // Resize canvas when fullscreen changes
  setTimeout(() => {
    resizeCanvas();
  }, 100);
}

// Lock orientation to landscape (if supported)
function lockOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("landscape").catch(() => {
      // Orientation lock not supported or failed
    });
  } else if (screen.lockOrientation) {
    screen.lockOrientation("landscape");
  } else if (screen.mozLockOrientation) {
    screen.mozLockOrientation("landscape");
  } else if (screen.msLockOrientation) {
    screen.msLockOrientation("landscape");
  }
}

const startGame = async () => {
  // Request fullscreen and landscape orientation
  await requestFullscreen();
  lockOrientation();
  
  isGameRunning = true;
  score = 0;
  lifes = 4;
  firstMissIgnored = false;
  ResetTimer();
  scoreValue.textContent = score;

  startPanel.style.display = "none";
  scorePanel.style.display = "none";
  if (missPanel) missPanel.style.display = "none";

  // Small delay to ensure fullscreen is active before resizing
  setTimeout(() => {
    resizeCanvas();
    CreateMolesGridCell();
  }, 100);
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
  
  // Clear the canvas to remove score, lives, and timer text
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  scorePanel.style.display = "flex";
  
  // Exit fullscreen when game ends (optional - comment out if you want to stay fullscreen)
  // exitFullscreen();
};

export const lifeReduce = () => {
  if (!isGameRunning) return;

  // Ignore the very first miss of the game (no life loss, no panel)
  if (!firstMissIgnored) {
    firstMissIgnored = true;
    return;
  }

  lifes--;
  if (lifes <= 0) {
    gameOver();
    return;
  }

  // Pause game and show missed mole panel
  isGameRunning = false;
  if (missMessage) {
    missMessage.textContent = `You missed a mole. ${lifes} lives left`;
  }
  if (missPanel) {
    missPanel.style.display = "flex";
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

// Initialize canvas on page load
resizeCanvas();

startBtn.onclick = () => startGame();

playAgainBtn.onclick = () => {
  scorePanel.style.display = "none";

  startGame();
};
// startGame();
homeBtn.onclick = () => {
  scorePanel.style.display = "none";
  startPanel.style.display = "block";
  // Exit fullscreen when returning to home
  exitFullscreen();
};

if (resumeBtn) {
  resumeBtn.onclick = () => {
    if (missPanel) {
      missPanel.style.display = "none";
    }
    isGameRunning = true;
  };
}
