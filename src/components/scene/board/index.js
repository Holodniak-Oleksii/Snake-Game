import { BOARD_SIZE } from "@/";
import Apple from "@/components/objects/apple";
import Snake from "@/components/objects/snake";
import { Container, Graphics } from "pixi.js";

class Board extends Container {
  constructor() {
    super();
    this.position.set(0, 0);

    this.snake = new Snake();
    this.apple = new Apple();

    this.draw();

    this.addChild(this.snake);
    this.addChild(this.apple);
  }

  draw() {
    const mask = new Graphics().rect(0, 0, BOARD_SIZE, BOARD_SIZE).fill(0x6b6b);
    this.addChild(mask);
  }

  update(delta) {
    this.snake.move(delta);
    if (this.checkCollision(this.snake.body[0], this.apple)) {
      this.snake.grow();
      this.apple.reposition();
    }
  }

  checkCollision(segment, apple) {
    return segment.x === apple.position.x && segment.y === apple.position.y;
  }
}

export default Board;
