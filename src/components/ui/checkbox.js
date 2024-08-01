import { Container, Graphics } from "pixi.js";

const svgString = `
<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8002 1.40002L3.64068 8.60002L1.2002 6.14574" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

class Checkbox extends Container {
  constructor(checked = false) {
    super();
    this.checked = checked;
    this.size = 32;
    this.checkMark = new Graphics().svg(svgString);

    this.interactive = true;
    this.buttonMode = true;
    this.cursor = "pointer";
    this.on("pointerdown", this.toggle);

    this.#draw();
  }

  #draw() {
    this.#addContainer();
    this.#addCheckMark();
  }

  #addContainer() {
    const background = new Graphics();
    background.roundRect(0, 0, this.size, this.size, 4);
    background.fill(0x3939ff);

    this.addChild(background);
  }

  #addCheckMark() {
    this.checkMark.width = this.size * 0.8;
    this.checkMark.height = this.size * 0.6;
    this.checkMark.y = this.size * 0.1;
    this.checkMark.x = this.size * 0.1;
    this.checkMark.visible = this.checked;

    this.addChild(this.checkMark);
  }

  toggle = () => {
    this.checked = !this.checked;
    this.checkMark.visible = this.checked;
    if (this.changeListener) {
      this.changeListener(this.checked);
    }
  };

  onChange(listener) {
    this.changeListener = listener;
  }
}

export default Checkbox;
