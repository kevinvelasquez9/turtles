import Sprite from './Sprite.js';

class Turtle extends Sprite {
  constructor(x, y) {
    const img = new Image(50, 50);
    img.src = './assets/turtle.png';
    super(x, y, 50, 50, img, 0, 0);

    this.displacement = 7;
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    document.addEventListener('keyup', this.keyUpHandler.bind(this));
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.dx = this.displacement;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.dx = -this.displacement;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.dx = 0;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.dx = 0;
    }
  }

  move(canvasWidth) {
    super.move();
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
    }
  }
}

export default Turtle;
