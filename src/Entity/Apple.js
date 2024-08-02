import { BOARD_SIZE } from "@/";
import { Container, Graphics } from "pixi.js";

class Apple extends Container {
  constructor() {
    super();
    this.size = 20;

    this.draw();
    this.position.set(
      Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size,
      Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size
    );
  }

  draw() {
    this.removeChildren();
    const appleGraphics = new Graphics();
    appleGraphics.roundRect(0, 0, this.size, this.size, 20);
    appleGraphics.fill(0xff0000);
    appleGraphics.stroke(0x000000);
    this.addChild(appleGraphics);
  }

  reposition(snake, wall) {
    let validPosition = false;

    while (!validPosition) {
      this.position.set(
        Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size,
        Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size
      );

      validPosition =
        !snake.body.some(
          (segment) =>
            segment.x === this.position.x && segment.y === this.position.y
        ) && wall
          ? !wall?.checkCollision(this.position.x, this.position.y)
          : true;
    }
  }
}

export default Apple;
