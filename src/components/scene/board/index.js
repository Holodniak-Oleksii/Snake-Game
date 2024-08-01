import { Container, Graphics } from "pixi.js";
import { BOARD_SIZE } from "../../..";

class Board extends Container {
  constructor() {
    super();
    this.position.set(0, 0);
  }

  draw() {
    const mask = new Graphics()
      .rect(0, 0, BOARD_SIZE, BOARD_SIZE)
      .fill(0x730909);
    this.addChild(mask);
  }
}

export default Board;
