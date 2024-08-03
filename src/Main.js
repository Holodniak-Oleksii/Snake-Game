import Scene from "@/Scene/Scene";

class MainScene {
  constructor(app) {
    this.app = app;
    this.scene = new Scene(app);
    this.app.stage.addChild(this.scene);
  }

  update(delta) {
    this.scene.update(delta);
  }
}

export default MainScene;
