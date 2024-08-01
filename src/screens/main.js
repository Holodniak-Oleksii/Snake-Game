import Scene from "@/components/scene";

class MainScene {
  constructor(app) {
    this.app = app;
    this.scene = new Scene(app);
    this.app.stage.addChild(this.scene);

    this.bindKeys();
  }

  bindKeys() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.scene.board.snake.setDirection("up");
          break;
        case "ArrowDown":
          this.scene.board.snake.setDirection("down");
          break;
        case "ArrowLeft":
          this.scene.board.snake.setDirection("left");
          break;
        case "ArrowRight":
          this.scene.board.snake.setDirection("right");
          break;
      }
    });
  }

  update(delta) {
    this.scene.update(delta);
  }
}

export default MainScene;
