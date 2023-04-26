import Turtle from './Turtle.js';
import Plastic from './Plastic.js';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.isPlaying = false;
    this.isGameOver = false;
    this.soundtrack = new Audio('./assets/music.wav');
    this.year = 1950; // TODO

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
    }
  }

  play() {
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
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = 'white';
    // this.ctx.fillText('Pollution: ' + this.score, 8, 20);
    if (this.isGameOver) {
      this.ctx.fillText('Game Over!', 8, 40);
    } else {
      // this.ctx.fillText('Year: ' + this.year, 8, 40);
    }
  }

  handleTurtle() {
    this.turtle.draw(this.ctx);
    this.turtle.move(this.canvas.width);
  }

  spawnPlastic() {
    if (Game.getRandomNumber(0, 30) === 0) {
      const plastic = new Plastic(
        Game.getRandomNumber(0, this.canvas.width - 40), // x
        0, // y
        Game.getRandomNumber(2, 5) // dy
      );
      this.plastics.push(plastic);
    }
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

  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default Game;
