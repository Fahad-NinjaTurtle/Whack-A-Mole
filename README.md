# 🎮 Whack A Mole Game

A fun and interactive HTML5 Canvas-based Whack A Mole game with responsive design, fullscreen support, and progressive difficulty.

## 🚀 Live Demo

**[Play the Game](https://fahad-ninjaturtle.github.io/Whack-A-Mole/)** 

## 📋 Table of Contents

- [Features](#features)
- [How to Play](#how-to-play)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Game Mechanics](#game-mechanics)
- [Browser Support](#browser-support)

## ✨ Features

- 🎯 **Classic Whack A Mole Gameplay** - Click moles as they appear to score points
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🖥️ **Fullscreen Mode** - Automatically enters fullscreen when game starts
- 🔄 **Landscape Orientation** - Optimized for landscape gameplay
- ⏱️ **60-Second Timer** - Race against time to achieve the highest score
- ❤️ **Lives System** - Start with 4 lives, lose one for each missed mole
- 🏆 **High Score Tracking** - LocalStorage saves your best score
- 🎨 **Modern UI** - Clean and intuitive interface with smooth animations
- 📊 **Real-time Score Display** - See your score and lives during gameplay

## 🎮 How to Play

1. **Start the Game**: Click the "Start" button on the welcome screen
2. **Whack Moles**: Click on moles as they appear in the 3x3 grid
3. **Score Points**: Each mole you hit adds to your score
4. **Avoid Missing**: Missing a mole reduces your lives
5. **Survive**: Try to last the full 60 seconds or until you run out of lives
6. **Beat Your High Score**: Challenge yourself to beat your previous best!

### Game Rules

- ⏰ **Time Limit**: 60 seconds per game
- ❤️ **Lives**: Start with 3 lives
- 🎯 **Scoring**: +1 point per mole hit
- 💀 **Game Over**: When time runs out or lives reach 0

## 🛠️ Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with responsive design and animations
- **JavaScript (ES6+)** - Game logic and interactivity
- **HTML5 Canvas** - Game rendering and graphics
- **LocalStorage API** - High score persistence
- **Fullscreen API** - Immersive gameplay experience
- **Screen Orientation API** - Landscape lock support

## 📦 Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "HTML 5 Week 4"
   ```

2. **Install dependencies** (optional, for linting)
   ```bash
   npm install
   ```

3. **Run a local server**

   Using Python:
   ```bash
   python -m http.server 8000
   ```

   Using Node.js (http-server):
   ```bash
   npx http-server
   ```

   Using VS Code Live Server extension

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
HTML 5 Week 4/
├── index.html          # Main HTML file
├── style.css           # Stylesheet with responsive design
├── README.md           # Project documentation
├── .gitignore          # Git ignore file
├── package.json        # Node.js dependencies
├── sprites/            # Game sprites and UI images
│   ├── ground.png      # Ground texture
│   ├── mole.png        # Mole sprite
│   ├── timerbg.png     # Timer background
│   ├── timerFiller.png # Timer fill sprite
│   ├── House.png       # Home button icon
│   └── Start.png       # Start screen background
├── sounds/             # Sound effects
│   └── Hit.m4a         # Hit sound effect
└── scripts/            # JavaScript modules
    ├── gameManager.js  # Main game logic and state management
    ├── moleManager.js  # Mole grid and click handling
    └── rendrer.js      # Canvas rendering and UI drawing
```

## 🎯 Game Mechanics

### Grid System
- **3x3 Grid**: 9 cells arranged in a square
- **Random Spawning**: Moles appear randomly in cells
- **Visual Feedback**: Ground sprites and mole animations

### Scoring System
- Base score: 1 point per mole hit
- High score tracking via LocalStorage
- Score persists across game sessions

### Difficulty
- Fixed spawn interval: 1 second between mole appearances
- All moles appear for the same duration
- Consistent gameplay experience

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Known Limitations

- Fullscreen API requires user interaction
- Screen orientation lock may not work on all devices
- LocalStorage requires browser support

## 📝 License

ISC License

## 👤 Author

Created as part of HTML5 Week 4 project.

---

**Enjoy playing Whack A Mole! 🎉**


