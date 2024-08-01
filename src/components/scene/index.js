import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/";
import { Container } from "pixi.js";
import Board from "./board";
import Menu from "./menu";

class Scene extends Container {
  constructor(app) {
    super();
    this.app = app;

    this.height = SCREEN_HEIGHT;
    this.width = SCREEN_WIDTH;

    this.menu = new Menu();
    this.board = new Board();

    this.addChild(this.menu);
    this.addChild(this.board);
  }

  update(delta) {
    this.board.update(delta);
  }
}

export default Scene;
