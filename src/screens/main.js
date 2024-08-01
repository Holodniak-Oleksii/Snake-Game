import Scene from "@/components/scene";

class MainScene {
  constructor(app) {
    this.app = app;
    this.scene = new Scene(app);
    this.app.stage.addChild(this.scene);
  }

  update(delta) {}
}

export default MainScene;
