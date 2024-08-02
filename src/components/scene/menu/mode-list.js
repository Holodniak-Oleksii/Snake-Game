import { GAME_MODE } from "@/";
import Checkbox from "@/components/ui/checkbox";
import User from "@/context/user";
import { Container } from "pixi.js";

class ModeList extends Container {
  constructor() {
    super();
    this.user = new User();
    this.checkboxes = [];
    this.y = 310;
    this.#draw();
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
    this.updateCheckboxes(selectedMode);
  };

  updateCheckboxes(selectedMode) {
    this.checkboxes.forEach((checkbox) => {
      checkbox.setChecked(checkbox.title === selectedMode);
    });
  }
}

export default ModeList;
