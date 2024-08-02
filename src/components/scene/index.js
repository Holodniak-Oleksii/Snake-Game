import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/";
import Game from "@/context/game";
import { Container } from "pixi.js";
import Board from "./board";
import Menu from "./menu";

class Scene extends Container {
  constructor(app) {
    super();
    this.app = app;

    this.height = SCREEN_HEIGHT;
    this.width = SCREEN_WIDTH;

    this.board = new Board();
    this.game = new Game();
    this.menu = new Menu(this.game);

    this.addChild(this.menu);
    this.addChild(this.board);
  }

  update(delta) {
    this.game.update(delta);
    this.menu.update();
  }
}

export default Scene;
