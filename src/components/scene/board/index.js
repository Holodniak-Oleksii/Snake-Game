import { BOARD_SIZE } from "@/";
import Game from "@/context/game";
import { Container, Graphics } from "pixi.js";

class Board extends Container {
  constructor() {
    super();
    this.position.set(0, 0);
    this.draw();
    this.#bindKeys();

    this.game = new Game(this);
  }

  draw() {
    const mask = new Graphics().rect(0, 0, BOARD_SIZE, BOARD_SIZE).fill(0x6b6b);
    this.addChild(mask);
  }

  update(delta) {
    this.game.update(delta);
  }

  #bindKeys() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.game.snake.setDirection("up");
          break;
        case "ArrowDown":
          this.game.snake.setDirection("down");
          break;
        case "ArrowLeft":
          this.game.snake.setDirection("left");
          break;
        case "ArrowRight":
          this.game.snake.setDirection("right");
          break;
      }
    });
  }
}

export default Board;
