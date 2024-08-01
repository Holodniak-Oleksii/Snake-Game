import { Container } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../..";
import Board from "./board";
import Menu from "./menu";

class Scene extends Container {
  constructor(app) {
    super();
    this.app = app;

    this.height = SCREEN_WIDTH;
    this.width = SCREEN_HEIGHT;

    this.menu = new Menu();
    this.board = new Board();

    this.menu.draw();
    this.board.draw();

    this.addChild(this.menu);
    this.addChild(this.board);
  }
}

export default Scene;
