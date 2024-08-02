import { BOARD_SIZE } from "@/";
import { Container, Graphics } from "pixi.js";

class Portal extends Container {
  constructor() {
    super();
    this.size = 20;
    this.positions = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];

    this.draw();
  }

  draw() {
    this.removeChildren();
    this.positions.forEach((position, index) => {
      const portalGraphics = new Graphics();
      portalGraphics.rect(0, 0, this.size, this.size);
      portalGraphics.fill(0xff0000);
      portalGraphics.position.set(position.x, position.y);
      portalGraphics.label = `apple-${index}`;
      this.addChild(portalGraphics);
    });
  }

  reposition(snake, wall) {
    this.positions.forEach((position, index) => {
      let validPosition = false;
      while (!validPosition) {
        const x =
          Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size;
        const y =
          Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size;

        validPosition =
          !snake.body.some((segment) => segment.x === x && segment.y === y) &&
          !wall.checkCollision(x, y) &&
          !this.positions.some(
            (pos, i) => i !== index && pos.x === x && pos.y === y
          );

        if (validPosition) {
          position.x = x;
          position.y = y;
        }
      }
    });

    this.draw();
  }

  getFirst() {
    return { position: this.positions[0] };
  }

  getSecond() {
    return { position: this.positions[1] };
  }
}

export default Portal;
