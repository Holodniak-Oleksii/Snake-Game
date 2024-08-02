import { BOARD_SIZE, GAME_MODE } from "@/";
import Apple from "@/components/objects/apple";
import Snake from "@/components/objects/snake";
import User from "@/context/user";
import { Graphics, Text } from "pixi.js";

class Game {
  constructor(stage) {
    this.stage = stage;
    this.snake = new Snake();
    this.apple = new Apple(this.snake); // Pass the snake to the apple
    this.user = new User();
    this.isGameOver = false;

    this.stage.addChild(this.snake);
    this.stage.addChild(this.apple);
  }

  update(delta) {
    if (this.isGameOver) return;

    const gameMode = this.user.getGameMode();
    if (gameMode === GAME_MODE.CLASSIC) {
      this.classicGame(delta);
    }
  }

  classicGame(delta) {
    this.snake.move(delta);
    if (this.checkCollision(this.snake.body[0], this.apple)) {
      this.snake.grow();
      this.apple.reposition(this.snake); // Pass the snake to ensure valid position
    }
    if (this.checkWallCollision() || this.checkSelfCollision()) {
      this.gameOver();
    }
  }

  checkCollision(segment, apple) {
    return segment.x === apple.position.x && segment.y === apple.position.y;
  }

  checkWallCollision() {
    const head = this.snake.body[0];
    return (
      head.x < 0 ||
      head.x >= BOARD_SIZE - this.snake.segmentSize ||
      head.y < 0 ||
      head.y >= BOARD_SIZE - this.snake.segmentSize
    );
  }

  checkSelfCollision() {
    const head = this.snake.body[0];
    return this.snake.body
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y);
  }

  gameOver() {
    this.isGameOver = true;

    const overlay = new Graphics();
    overlay.rect(0, 0, BOARD_SIZE, BOARD_SIZE);
    overlay.fill({ color: 0x000000, alpha: 0.4 });
    this.stage.addChild(overlay);

    const gameOverText = new Text({
      text: "Game Over",
      style: {
        fontFamily: "Roboto",
        fontSize: 48,
        fill: 0xffffff,
        align: "center",
      },
    });
    gameOverText.anchor.set(0.5);
    gameOverText.position.set(BOARD_SIZE / 2, BOARD_SIZE / 2);
    this.stage.addChild(gameOverText);
  }
}

export default Game;
