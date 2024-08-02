import { BOARD_SIZE, GAME_MODE } from "@/";
import Snake from "@/components/objects/snake";
import User from "@/context/user";
import { Graphics, Text } from "pixi.js";
import ClassicMode from "./classic";
import NoDieMode from "./no-die";
import PortalMode from "./portal";
import SpeedMode from "./speed";
import WallsMode from "./walls";

class Game {
  constructor(stage) {
    if (typeof Game.instance === "object") {
      return Game.instance;
    }

    this.stage = stage;
    this.gameScore = 0;
    this.isGameOver = false;
    this.isPlay = false;

    this.user = new User();
    this.snake = new Snake();

    this.mode = new ClassicMode(this);

    Game.instance = this;
    return this;
  }

  update(delta) {
    if (this.isGameOver || !this.isPlay) return;
    this.mode.run(delta);
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

    const gameMode = this.user.getGameMode();

    if (gameMode === GAME_MODE.CLASSIC) {
      this.mode = new ClassicMode(this);
    }
    if (gameMode === GAME_MODE.NO_DIE) {
      this.mode = new NoDieMode(this);
    }
    if (gameMode === GAME_MODE.WALLS) {
      this.mode = new WallsMode(this);
    }

    if (gameMode === GAME_MODE.SPEED) {
      this.mode = new SpeedMode(this);
    }

    if (gameMode === GAME_MODE.PORTAL) {
      this.mode = new PortalMode(this);
    }
    this.mode.start();

    this.isPlay = true;
    this.isGameOver = false;
  }

  exit() {
    this.isPlay = false;
    this.isGameOver = false;

    this.clearObject("gameObject");
    this.clearObject("modalObject");
  }

  pause() {
    this.isPlay = false;

    const overlay = new Graphics();
    overlay.rect(0, 0, BOARD_SIZE, BOARD_SIZE);
    overlay.fill({ color: 0x000000, alpha: 0.4 });
    overlay.zIndex = 3;
    overlay.label = "modalObject";

    this.stage.addChild(overlay);
  }

  resume() {
    this.isPlay = true;
    this.clearObject("modalObject");
  }

  gameOver() {
    this.isGameOver = true;
    this.isPlay = false;
    this.clearObject("gameObject");

    const overlay = new Graphics();
    overlay.rect(0, 0, BOARD_SIZE, BOARD_SIZE);
    overlay.fill({ color: 0x000000, alpha: 0.4 });
    overlay.zIndex = 3;
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
