import Turtle from './Turtle.js';
import Plastic from './Plastic.js';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.isPlaying = false;
    this.isGameOver = false;
    this.won = false;
    this.soundtrack = new Audio('./assets/music.wav');
    this.year = 1950;

    this.turtle = new Turtle(
      this.canvas.width / 2 - 25,
      this.canvas.height - 60
    );
    this.plastics = [];

    document.addEventListener('keydown', this.keyDownHandler.bind(this));
  }

  keyDownHandler(e) {
    if (this.isGameOver) {
      return;
    }
    if (
      !this.isPlaying &&
      (e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft')
    ) {
      this.isPlaying = true;
      this.soundtrack.play();
      this.soundtrack.loop = true;
      this.startTimer();
    }
  }

  play() {
    if (this.year === 2023) {
      this.isGameOver = true;
      this.won = true;
    }
    if (this.isGameOver) {
      this.clearSprites();
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.handleTurtle();
    this.handlePlastics();
    this.displayText();

    window.requestAnimationFrame(this.play.bind(this));
  }

  clearSprites() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.turtle.draw(this.ctx);
    this.displayText();
  }

  displayText() {
    this.ctx.font = '18px Arial';
    this.ctx.fillStyle = 'white';
    if (this.isGameOver) {
      if (this.won) {
        this.ctx.fillText('You Win!', 8, 60);
      } else {
        this.ctx.fillText('Game Over!', 8, 60);
      }
    }
    this.ctx.fillText('Year: ' + this.year, 8, 40);
  }

  handleTurtle() {
    this.turtle.draw(this.ctx);
    this.turtle.move(this.canvas.width);
  }

  spawnPlastic() {
    if (this.isPlaying && this.shouldSpawnPlastic()) {
      const plastic = new Plastic(
        Game.getRandomNumber(0, this.canvas.width - 40), // x
        0, // y
        Game.getRandomNumber(2, 5) // dy
      );
      this.plastics.push(plastic);
    }
  }

  shouldSpawnPlastic() {
    return Game.getRandomNumber(this.year, 2024) === 2023;
  }

  handlePlastics() {
    this.spawnPlastic();
    for (let i = this.plastics.length - 1; i >= 0; i--) {
      const plastic = this.plastics[i];
      plastic.draw(this.ctx);
      plastic.move(this.canvas.width);
      if (plastic.intersects(this.turtle)) {
        this.isGameOver = true;
        this.soundtrack.pause();
      }
      if (plastic.y > this.canvas.height) {
        this.plastics.splice(i, 1);
      }
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.year += 1;
    }, 3000);
  }

  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default Game;
