import { BOARD_SIZE } from "@/";
import Apple from "@/Entity/Apple";
import Snake from "@/Entity/Snake";
import Wall from "@/Entity/Wall";
import { checkCollision } from "@/utils/helpers";
import ClassicMode from "./classic";

class WallsMode extends ClassicMode {
  constructor(game) {
    super(game);
    this.wall = new Wall();
  }

  run(delta) {
    this.snake.move(delta);
    if (checkCollision(this.snake.body[0], this.apple)) {
      this.snake.grow();
      this.game.gameScore += 1;
      this.apple.reposition(this.snake, this.wall);
      this.#addRandomWall();
    }
    if (
      this.checkWallCollision() ||
      this.checkSelfCollision() ||
      this.#checkCustomWallCollision()
    ) {
      this.game.gameOver();
    }
  }

  start() {
    this.snake = new Snake();
    this.wall = new Wall();
    this.apple = new Apple();

    this.wall.label = "gameObject";
    this.snake.label = "gameObject";
    this.apple.label = "gameObject";

    this.game.stage.addChild(this.snake);
    this.game.stage.addChild(this.apple);
    this.game.stage.addChild(this.wall);
  }

  #addRandomWall() {
    let x, y;
    do {
      x =
        Math.floor(Math.random() * (BOARD_SIZE / this.snake.segmentSize)) *
        this.snake.segmentSize;
      y =
        Math.floor(Math.random() * (BOARD_SIZE / this.snake.segmentSize)) *
        this.snake.segmentSize;
    } while (
      this.snake.body.some((segment) => segment.x === x && segment.y === y) ||
      (this.apple.position.x === x && this.apple.position.y === y) ||
      this.wall.checkCollision(x, y)
    );

    this.wall.addCell(x, y);
  }

  #checkCustomWallCollision() {
    const head = this.snake.body[0];
    return this.wall.checkCollision(head.x, head.y);
  }
}

export default WallsMode;
