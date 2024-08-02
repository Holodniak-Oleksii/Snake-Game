import { BOARD_SIZE, GAME_MODE } from "@/";
import Apple from "@/components/objects/apple";
import Snake from "@/components/objects/snake";
import Button from "@/components/ui/button";
import User from "@/context/user";
import { Graphics, Text } from "pixi.js";

class Game {
  constructor(stage) {
    if (typeof Game.instance === "object") {
      return Game.instance;
    }

    this.stage = stage;
    this.snake = new Snake();
    this.apple = new Apple(this.snake);
    this.user = new User();
    this.isGameOver = false;
    this.isPlay = false;

    this.gameScore = 0;

    Game.instance = this;
    return this;
  }

  update(delta) {
    if (this.isGameOver || !this.isPlay) return;

    const gameMode = this.user.getGameMode();
    if (gameMode === GAME_MODE.CLASSIC) {
      this.classicGame(delta);
    }
    if (gameMode === GAME_MODE.NO_DIE) {
      this.noDieGame(delta);
    }
  }

  noDieGame(delta) {
    this.snake.move(delta);
    if (this.checkCollision(this.snake.body[0], this.apple)) {
      this.snake.grow();
      this.gameScore += 1;
      this.apple.reposition(this.snake);
    }
    this.handleWallPass();
  }

  handleWallPass() {
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

  classicGame(delta) {
    this.snake.move(delta);
    if (this.checkCollision(this.snake.body[0], this.apple)) {
      this.snake.grow();
      this.gameScore += 1;
      this.apple.reposition(this.snake);
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

  updateUserScore() {
    this.user.setLastScore(this.gameScore);
    if (this.gameScore > this.user.bestScore) {
      this.user.setBestScore(this.gameScore);
    }
    this.gameScore = 0;
  }

  clearObject(label) {
    this.stage.children
      .filter((child) => child.label === label)
      .forEach((child) => this.stage.removeChild(child));
  }

  startGame() {
    this.updateUserScore();
    this.clearObject("gameObject");
    this.clearObject("modalObject");

    this.snake = new Snake();
    this.apple = new Apple(this.snake);

    this.snake.label = "gameObject";
    this.apple.label = "gameObject";

    this.stage.addChild(this.snake);
    this.stage.addChild(this.apple);

    this.isPlay = true;
    this.isGameOver = false;
  }

  showResume() {
    this.isPlay = false;

    const overlay = new Graphics();
    overlay.rect(0, 0, BOARD_SIZE, BOARD_SIZE);
    overlay.fill({ color: 0x000000, alpha: 0.4 });
    overlay.label = "modalObject";

    this.stage.addChild(overlay);

    this.resumeButton = new Button("Resume", () => {
      this.isPlay = true;
      this.clearObject("modalObject");
    });

    this.resumeButton.position.set(
      BOARD_SIZE / 2 - this.resumeButton.width / 2,
      BOARD_SIZE / 2 - this.resumeButton.height / 2
    );
    this.resumeButton.label = "modalObject";

    this.stage.addChild(this.resumeButton);
  }

  gameOver() {
    this.isGameOver = true;
    this.isPlay = false;
    this.clearObject("gameObject");

    const overlay = new Graphics();
    overlay.rect(0, 0, BOARD_SIZE, BOARD_SIZE);
    overlay.fill({ color: 0x000000, alpha: 0.4 });
    overlay.label = "gameObject";

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
    gameOverText.label = "gameObject";

    this.stage.addChild(gameOverText);

    this.updateUserScore();
  }
}

export default Game;
