import { BOARD_SIZE } from "@/";
import { checkCollision } from "@/Utils/helpers";
import ClassicMode from "./Classic";

class NoDieMode extends ClassicMode {
  constructor(game) {
    super(game);
  }

  run(delta) {
    this.snake.move(delta);
    if (checkCollision(this.snake.body[0], this.apple)) {
      this.snake.grow();
      this.game.gameScore += 1;
      this.apple.reposition(this.snake, this.wall);
    }
    this.#handleWallPass();
  }

  #handleWallPass() {
    const head = this.snake.body[0];
    if (head.x < 0) {
      head.x = BOARD_SIZE - this.snake.segmentSize;
    } else if (head.x >= BOARD_SIZE) {
      head.x = 0;
    }
    if (head.y < 0) {
      head.y = BOARD_SIZE - this.snake.segmentSize;
    } else if (head.y >= BOARD_SIZE) {
      head.y = 0;
    }
  }
}

export default NoDieMode;
