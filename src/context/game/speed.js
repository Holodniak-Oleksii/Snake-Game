import { checkCollision } from "@/utils/helpers";
import ClassicMode from "./classic";

class SpeedMode extends ClassicMode {
  constructor(game) {
    super(game);
  }

  run(delta) {
    this.snake.move(delta);
    if (checkCollision(this.snake.body[0], this.apple)) {
      this.snake.grow();
      this.snake.speed += this.snake.speed * 0.1;
      this.game.gameScore += 1;
      this.apple.reposition(this.snake);
    }
    if (this.checkWallCollision() || this.checkSelfCollision()) {
      this.game.gameOver();
    }
  }
}

export default SpeedMode;
