import { GAME_MODE, MENU_WIDTH } from "@/";
import Checkbox from "@/components/ui/checkbox";
import User from "@/context/user";
import { Container, Graphics } from "pixi.js";

class ModeList extends Container {
  constructor(onChange) {
    super();
    this.user = new User();
    this.checkboxes = [];
    this.y = 320;
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
      const checkbox = new Checkbox(isChecked, mode, this.handleCheckboxToggle);
      checkbox.y = index * 40;
      checkbox.x = 20;

      this.checkboxes.push(checkbox);
      this.addChild(checkbox);
    });
  }

  handleCheckboxToggle = (selectedMode) => {
    if (selectedMode === this.user.getGameMode()) {
      return;
    }

    this.user.setGameMode(selectedMode);
    this.#updateCheckboxes(selectedMode);
  };

  #updateCheckboxes(selectedMode) {
    this.checkboxes.forEach((checkbox) => {
      checkbox.setChecked(checkbox.title === selectedMode);
    });

    this.updateCallback();
  }
}

export default ModeList;
