import Game from './Game.js';
import Sprite from './Sprite.js';

class Plastic extends Sprite {
  constructor(x, y, dy) {
    const img = new Image(40, 40);
    // const items = ['bag', 'bottle'];
    // const random = Game.getRandomNumber(0, 2);
    // console.log(random);
    // img.src = `./assets/${items[random]}.png`;
    img.src = './assets/bag.png';
    // img.src = './assets/cropped.png';
    super(x, y, 40, 40, img, 0, dy);
  }

  move(canvasWidth) {
    this.x += Game.getRandomNumber(-2, 2);
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + 40 > canvasWidth) {
      this.x = canvasWidth - 40;
    }
    this.y += this.dy;
  }
}

export default Plastic;
