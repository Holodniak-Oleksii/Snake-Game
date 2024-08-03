import { BOARD_SIZE } from "@/";
import Game from "@/App/Game";
import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";

class Board extends Container {
  constructor() {
    super();
    this.position.set(0, 0);
    this.draw();
    this.#bindKeys();

    this.game = new Game(this);

    this.scoreContainer = new Container();
    this.scoreContainer.zIndex = 2;
    this.scoreBackground = new Graphics();
    this.scoreText = new Text({
      text: this.gameScore,
      style: {
        fontFamily: "Bulgarian-Bridge",
        fontSize: 16,
        fill: 0xffffff,
        align: "center",
      },
    });

    this.scoreContainer.addChild(this.scoreBackground);
    this.scoreContainer.addChild(this.scoreText);
    this.addChild(this.scoreContainer);

    this.#updateScoreDisplay();
  }

  draw() {
    Assets.loadBundle("board")
      .then((texture) => {
        const grass = Sprite.from(texture.grass);

        const scaleX = BOARD_SIZE / grass.texture.width;
        const scaleY = BOARD_SIZE / grass.texture.height;

        const scale = Math.min(scaleX, scaleY);

        grass.scale.set(scale);

        grass.position.set(
          (BOARD_SIZE - grass.width) / 2,
          (BOARD_SIZE - grass.height) / 2
        );

        this.addChild(grass);
      })
      .catch(() => {
        const mask = new Graphics()
          .rect(0, 0, BOARD_SIZE, BOARD_SIZE)
          .fill(0x6b6b);
        this.addChild(mask);
      });
  }

  update(delta) {
    this.game.update(delta);
    this.#updateScoreDisplay();
  }

  #bindKeys() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.game.mode.snake.setDirection("up");
          break;
        case "ArrowDown":
          this.game.mode.snake.setDirection("down");
          break;
        case "ArrowLeft":
          this.game.mode.snake.setDirection("left");
          break;
        case "ArrowRight":
          this.game.mode.snake.setDirection("right");
          break;
      }
    });
  }

  #updateScoreDisplay() {
    this.scoreText.text = this.game.gameScore;

    const padding = 10;
    const width = this.scoreText.width + padding * 2;
    const height = this.scoreText.height + padding * 2;

    this.scoreBackground.clear();
    this.scoreBackground.roundRect(0, 0, width, height, 10);
    this.scoreBackground.fill({ color: 0x000000, alpha: 0.5 });

    this.scoreText.position.set(padding, padding);
    this.scoreContainer.position.set(BOARD_SIZE - width - 10, 10);
  }
}

export default Board;
