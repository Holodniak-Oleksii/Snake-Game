import { MENU_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import User from "@/context/user";
import { Container, Graphics, Text, TextStyle } from "pixi.js";
import ModeList from "./mode-list";

class Menu extends Container {
  constructor() {
    super();
    this.position.set(SCREEN_WIDTH - MENU_WIDTH, 0);
    this.user = new User();

    this.bestScoreLabel = new Label("Best Score:", this.user.getBestScore());
    this.lastScoreLabel = new Label("Last Score:", this.user.getLastScore());
    this.gameModeLabel = new Label("Mode:", this.user.getGameMode());

    this.#draw();
  }

  #draw() {
    const mask = new Graphics()
      .rect(0, 0, MENU_WIDTH, SCREEN_HEIGHT)
      .fill(0x3fff21);

    this.addChild(mask);
    this.#drawTitle();
    this.#drawUserRating();
    this.#drawModeList();
    this.#drawButtons();
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
    this.bestScoreLabel.y = 120;
    this.lastScoreLabel.y =
      this.bestScoreLabel.y + this.bestScoreLabel.height + 20;
    this.gameModeLabel.y =
      this.lastScoreLabel.y + this.lastScoreLabel.height + 20;

    this.addChild(this.bestScoreLabel);
    this.addChild(this.lastScoreLabel);
    this.addChild(this.gameModeLabel);
  }

  update = () => {
    // test example
    this.gameModeLabel.setValue(this.user.getGameMode());
  };

  #drawModeList() {
    const modeList = new ModeList(this.update);
    this.addChild(modeList);
  }
  #drawButtons() {
    const buttonSize = (MENU_WIDTH - 60) / 2;
    const buttonPlay = new Button("Play", () => alert("Play Clicked"), {
      width: buttonSize,
    });
    const buttonExit = new Button("Exit", () => alert("Exit Clicked"), {
      width: buttonSize,
    });

    buttonPlay.y = SCREEN_HEIGHT - buttonPlay.height - 20;
    buttonPlay.x = 20;

    buttonExit.y = SCREEN_HEIGHT - buttonPlay.height - 20;
    buttonExit.x = MENU_WIDTH - buttonExit.width - 20;

    this.addChild(buttonPlay);
    this.addChild(buttonExit);
  }
}

export default Menu;
