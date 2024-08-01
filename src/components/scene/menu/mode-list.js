import { Container, Graphics } from "pixi.js";
import { GAME_MODE, MENU_WIDTH } from "../../..";
import User from "../../../context/user";
import Checkbox from "../../ui/checkbox";

class ModeList extends Container {
  constructor(onChange) {
    super();
    this.user = new User();
    this.checkboxes = [];
    this.y = 360;
    this.updateCallback = onChange;

    this.#drawBackground();
    this.#draw();
  }

  #drawBackground() {
    const background = new Graphics()
      .rect(0, -20, MENU_WIDTH, Object.values(GAME_MODE).length * 40 + 20)
      .fill(0xddff00);

    this.addChild(background);
  }

  #draw() {
    const modes = Object.values(GAME_MODE);
    modes.forEach((mode, index) => {
      let isChecked = mode === this.user.getGameMode();
      const checkbox = new Checkbox(isChecked, mode);
      checkbox.y = index * 40;
      checkbox.x = 20;

      checkbox.onChange((checked) => {
        if (checked) {
          this.user.setGameMode(mode);
          this.#updateCheckboxes(mode);
        }
      });

      this.checkboxes.push(checkbox);
      this.addChild(checkbox);
    });
  }

  #updateCheckboxes(selectedMode) {
    this.checkboxes.forEach((checkbox) => {
      checkbox.checked = checkbox.title === selectedMode;
      checkbox.checkMark.visible = checkbox.checked;
    });

    this.updateCallback();
  }
}

export default ModeList;
