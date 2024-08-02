import Portal from "@/Entity/Portal";
import Snake from "@/Entity/Snake";
import { checkCollision } from "@/Utils/helpers";
import ClassicMode from "./classic";

class PortalMode extends ClassicMode {
  constructor(game) {
    super(game);
    this.portal = new Portal(this.snake);
  }

  run(delta) {
    this.snake.move(delta);
    if (checkCollision(this.snake.body[0], this.portal.apple1)) {
      this.snake.grow();
      this.game.gameScore += 1;
      this.snake.teleport(
        this.portal.apple2.position.x,
        this.portal.apple2.position.y
      );
      this.portal.reposition(this.snake);
    }
    if (checkCollision(this.snake.body[0], this.portal.apple2)) {
      this.snake.grow();
      this.game.gameScore += 1;
      this.snake.teleport(
        this.portal.apple1.position.x,
        this.portal.apple1.position.y
      );
      this.portal.reposition(this.snake);
    }
    if (this.checkWallCollision() || this.checkSelfCollision()) {
      this.game.gameOver();
    }
  }

  start() {
    this.snake = new Snake();
    this.portal = new Portal(this.snake);

    this.snake.label = "gameObject";
    this.portal.apple1.label = "gameObject";
    this.portal.apple2.label = "gameObject";

    this.game.stage.addChild(this.snake);
    this.game.stage.addChild(this.portal.apple1);
    this.game.stage.addChild(this.portal.apple2);
  }
}

export default PortalMode;
