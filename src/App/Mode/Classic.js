import { BOARD_SIZE } from "@/";
import Apple from "@/Entity/Apple";
import Snake from "@/Entity/Snake";
import { checkCollision } from "@/Utils/helpers";
import GameMode from "./ModeAbstraction";

class ClassicMode extends GameMode {
  constructor(game) {
    super();
    this.game = game;
    this.snake = new Snake();
    this.apple = new Apple(this.snake);
  }

  run(delta) {
    this.snake.move(delta);
    if (checkCollision(this.snake.body[0], this.apple)) {
      this.snake.grow();
      this.game.gameScore += 1;
      this.apple.reposition(this.snake);
    }
    if (this.checkWallCollision() || this.checkSelfCollision()) {
      this.game.gameOver();
    }
  }

  start() {
    this.snake = new Snake();
    this.apple = new Apple();

    this.snake.label = "gameObject";
    this.apple.label = "gameObject";

    this.game.stage.addChild(this.snake);
    this.game.stage.addChild(this.apple);
  }

  checkWallCollision() {
    const head = this.snake.body[0];
    return (
      head.x < 0 ||
      head.x > BOARD_SIZE - this.snake.segmentSize ||
      head.y < 0 ||
      head.y > BOARD_SIZE - this.snake.segmentSize
    );
  }

  checkSelfCollision() {
    const head = this.snake.body[0];
    return this.snake.body
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y);
  }
}

export default ClassicMode;
