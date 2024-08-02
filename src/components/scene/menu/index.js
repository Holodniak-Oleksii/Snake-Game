import { MENU_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/";
import Label from "@/components/ui/label";
import Game from "@/context/game";
import User from "@/context/user";
import { Container, Graphics, Text, TextStyle } from "pixi.js";
import Button from "../../ui/button";
import ModeList from "./mode-list";

class Menu extends Container {
  constructor() {
    super();
    this.position.set(SCREEN_WIDTH - MENU_WIDTH, 0);
    this.user = new User();
    this.game = new Game();

    this.isPause = false;

    this.bestScoreLabel = new Label("Best Score:", this.user.getBestScore());
    this.lastScoreLabel = new Label("Last Score:", this.user.getLastScore());
    this.buttonWidth = (MENU_WIDTH - 60) / 2;

    this.buttonLeft = new Button({
      style: {
        width: this.buttonWidth,
      },
    });

    this.buttonRight = new Button({
      style: {
        width: this.buttonWidth,
      },
    });

    this.#draw();
  }

  update = () => {
    this.lastScoreLabel.setValue(this.user.getLastScore());
    this.bestScoreLabel.setValue(this.user.getBestScore());
    if (this.game.isGameOver) {
      this.#setInitialState();
      this.isPause = false;
    }
  };

  #draw() {
    const mask = new Graphics()
      .rect(0, 0, MENU_WIDTH, SCREEN_HEIGHT)
      .fill(0x5a6102);

    this.addChild(mask);
    this.#drawTitle();
    this.#drawUserRating();
    this.#setInitialState();
  }

  #startGame() {
    this.game.startGame();
    this.isPause = false;
    this.#setInGameMenuState();
  }

  #setInitialState() {
    this.#updateButtonSettings(
      this.buttonLeft,
      "Play",
      () => {
        this.#startGame();
      },
      "center"
    );
    this.#removeModeList();
    this.removeChild(this.buttonRight);
    this.addChild(this.buttonLeft);
    this.#drawModeList();
  }

  #setInGameMenuState() {
    this.#updateButtonSettings(
      this.buttonLeft,
      "Menu",
      () => this.#setMenuState(),
      "left"
    );
    this.#updateButtonSettings(
      this.buttonRight,
      this.isPause ? "Resume" : "Pause",
      () => this.#handlerPauseToggle(),
      "right"
    );
    this.addChild(this.buttonLeft);
    this.addChild(this.buttonRight);
    this.#removeModeList();
  }

  #setMenuState() {
    this.#updateButtonSettings(
      this.buttonLeft,
      "Play",
      () => {
        this.#startGame();
      },
      "left"
    );
    this.#updateButtonSettings(
      this.buttonRight,
      "Exit",
      () => this.#setInGameMenuState(),
      "right"
    );
    this.#drawModeList();
  }

  #handlerPauseToggle() {
    this.isPause = !this.isPause;
    if (this.isPause) {
      this.game.pause();
    } else {
      this.game.resume();
    }
    this.#updateButtonSettings(
      this.buttonRight,
      this.isPause ? "Resume" : "Pause",
      () => this.#handlerPauseToggle(),
      "right"
    );
  }

  #updateButtonSettings(button, title, onClick, orientation) {
    if (title) {
      button.setText(title);
    }
    if (onClick) {
      button.setEvent(onClick);
    }
    if (orientation) {
      if (orientation === "left") {
        button.x = 20;
      }
      if (orientation === "right") {
        button.x = MENU_WIDTH - this.buttonWidth - 20;
      }
      if (orientation === "center") {
        button.x = MENU_WIDTH / 2 - this.buttonWidth / 2;
      }
      button.y = SCREEN_HEIGHT - button.height - 40;
    }
  }

  #drawTitle() {
    const style = new TextStyle({
      fontFamily: "Bulgarian-Bridge",
      fontSize: 42,
      fill: 0xffffff,
      stroke: 0x000000,
      dropShadow: true,
    });

    const title = new Text({
      text: "Snake Game",
      style,
    });

    title.anchor.set(0.5, 0.5);
    title.position.set(MENU_WIDTH / 2, 40);

    const background = new Graphics();
    background.roundRect(0, 0, MENU_WIDTH, title.height + 40, 4);
    background.fill(0x626d13);

    this.addChild(background);

    this.addChild(title);
  }

  #drawUserRating() {
    this.bestScoreLabel.y = 150;
    this.lastScoreLabel.y =
      this.bestScoreLabel.y + this.bestScoreLabel.height + 2;
    this.addChild(this.bestScoreLabel);
    this.addChild(this.lastScoreLabel);
  }

  #drawModeList() {
    this.modeList = new ModeList();
    this.addChild(this.modeList);
  }

  #removeModeList() {
    if (this.modeList) {
      this.removeChild(this.modeList);
    }
  }
}

export default Menu;
