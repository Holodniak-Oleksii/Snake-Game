import { MENU_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Game from "@/context/game";
import User from "@/context/user";
import { Container, Graphics, Text, TextStyle } from "pixi.js";
import ModeList from "./mode-list";

class Menu extends Container {
  constructor() {
    super();
    this.position.set(SCREEN_WIDTH - MENU_WIDTH, 0);
    this.user = new User();
    this.game = new Game();
    this.bestScoreLabel = new Label("Best Score:", this.user.getBestScore());
    this.lastScoreLabel = new Label("Last Score:", this.user.getLastScore());
    this.toggled = !this.game.isPlay;
    this.#draw();
  }

  #draw() {
    const mask = new Graphics()
      .rect(0, 0, MENU_WIDTH, SCREEN_HEIGHT)
      .fill(0x3fff21);

    this.addChild(mask);
    this.#drawTitle();
    this.#drawUserRating();
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
    this.addChild(this.bestScoreLabel);
    this.addChild(this.lastScoreLabel);
  }

  update = () => {
    this.lastScoreLabel.setValue(this.user.getLastScore());
    this.bestScoreLabel.setValue(this.user.getBestScore());
    if (this.toggled !== this.game.isPlay) {
      if (this.game.isPlay) {
        this.#removeButtons();
        this.#removeModeList();
        this.#addMenuButton();
      } else {
        this.#removeMenuButton();
        this.#drawButtons();
        this.#drawModeList();
      }
    }
    this.toggled = this.game.isPlay;
  };

  #removeModeList() {
    if (this.modeList) {
      this.removeChild(this.modeList);
    }
  }

  #drawModeList() {
    this.modeList = new ModeList(this.update);
    this.addChild(this.modeList);
  }

  #drawButtons() {
    const buttonSize = (MENU_WIDTH - 60) / 2;
    this.buttonPlay = new Button("Play", () => this.game.startGame(), {
      width: buttonSize,
    });
    this.buttonExit = new Button("Exit", () => window.close(), {
      width: buttonSize,
    });

    this.buttonPlay.y = SCREEN_HEIGHT - this.buttonPlay.height - 20;
    this.buttonPlay.x = 20;

    this.buttonExit.y = SCREEN_HEIGHT - this.buttonPlay.height - 20;
    this.buttonExit.x = MENU_WIDTH - this.buttonExit.width - 20;

    this.addChild(this.buttonPlay);
    this.addChild(this.buttonExit);
  }

  #addMenuButton() {
    if (this.menuButton) return;

    this.menuButton = new Button(
      "Menu",
      () => {
        this.game.showResume();
      },
      {
        width: MENU_WIDTH - 40,
      }
    );

    this.menuButton.y = SCREEN_HEIGHT - this.menuButton.height - 20;
    this.menuButton.x = 20;

    this.addChild(this.menuButton);
  }

  #removeMenuButton() {
    if (this.menuButton) {
      this.removeChild(this.menuButton);
      this.menuButton = null;
    }
  }

  #removeButtons() {
    if (this.buttonPlay) {
      this.removeChild(this.buttonPlay);
      this.buttonPlay = null;
    }
    if (this.buttonExit) {
      this.removeChild(this.buttonExit);
      this.buttonExit = null;
    }
  }
}

export default Menu;
