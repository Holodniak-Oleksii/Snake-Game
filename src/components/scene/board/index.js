import { BOARD_SIZE } from "@/";
import { Container, Graphics } from "pixi.js";

class Board extends Container {
  constructor() {
    super();
    this.position.set(0, 0);
  }

  draw() {
    const mask = new Graphics()
      .rect(0, 0, BOARD_SIZE, BOARD_SIZE)
      .fill(0x6b6b6b);
    this.addChild(mask);
  }
}

export default Board;
