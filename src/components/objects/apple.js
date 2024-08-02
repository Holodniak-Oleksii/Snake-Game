import { BOARD_SIZE } from "@/";
import { Container, Graphics } from "pixi.js";

class Apple extends Container {
  constructor(snake) {
    super();
    this.size = 20;
    this.reposition(snake);

    this.draw();
  }

  draw() {
    this.removeChildren();
    const appleGraphics = new Graphics();
    appleGraphics.rect(0, 0, this.size, this.size);
    appleGraphics.fill(0xff0000);
    this.addChild(appleGraphics);
  }

  reposition(snake) {
    let validPosition = false;

    while (!validPosition) {
      this.position.set(
        Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size,
        Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size
      );

      validPosition = !snake.body.some(
        (segment) =>
          segment.x === this.position.x && segment.y === this.position.y
      );
    }
  }
}

export default Apple;
