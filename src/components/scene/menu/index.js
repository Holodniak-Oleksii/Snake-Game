import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { MENU_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../..";
import User from "../../../context/user";
import Checkbox from "../../ui/checkbox";
import Label from "../../ui/label";

class Menu extends Container {
  constructor() {
    super();
    this.position.set(SCREEN_WIDTH - MENU_WIDTH, 0);
  }

  draw() {
    const mask = new Graphics()
      .rect(0, 0, MENU_WIDTH, SCREEN_HEIGHT)
      .fill(0x3fff21);

    this.addChild(mask);
    this.#drawTitle();
    this.#drawUserRating();
    this.#drawModeList();
  }

  #drawTitle() {
    const style = new TextStyle({
      fontFamily: "Roboto",
      fontSize: 24,
    });

    const title = new Text({
      text: "Snake Game",
      style,
      y: 50,
    });

    title.anchor.set(0.5, 0.5);
    title.position.set(MENU_WIDTH / 2, 50);

    this.addChild(title);
  }

  #drawUserRating() {
    const user = new User();
    const bestScoreLabel = new Label("Best Score:", user.getBestScore());
    const lastScoreLabel = new Label("Last Score:", user.getLastScore());

    bestScoreLabel.y = 120;
    lastScoreLabel.y = bestScoreLabel.y + bestScoreLabel.height + 20;

    this.addChild(bestScoreLabel);
    this.addChild(lastScoreLabel);
  }

  #drawModeList() {
    const checkbox = new Checkbox();

    checkbox.onChange((checked) => {
      console.log("Checkbox state:", checked);
    });

    this.addChild(checkbox);
  }
}

export default Menu;
