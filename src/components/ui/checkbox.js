import { Container, Graphics, Text, TextStyle } from "pixi.js";

const svgString = `
<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8002 1.40002L3.64068 8.60002L1.2002 6.14574" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

class Checkbox extends Container {
  constructor(checked = false, title = "") {
    super();
    this.checked = checked;
    this.size = 24;
    this.title = title;

    this.container = new Container();
    this.addChild(this.container);

    this.checkMark = new Graphics().svg(svgString);

    this.interactive = true;
    this.buttonMode = true;
    this.cursor = "pointer";
    this.on("pointerdown", this.toggle);
    this.#draw();
  }

  #draw() {
    this.#addBackground();
    this.#addCheckMark();
    this.#addTitle();
  }

  #addBackground() {
    const background = new Graphics();
    background.roundRect(0, 0, this.size, this.size, 4);
    background.fill(0x3939ff);

    this.container.addChild(background);
  }

  #addCheckMark() {
    this.checkMark.width = this.size * 0.8;
    this.checkMark.height = this.size * 0.6;
    this.checkMark.y = this.size * 0.1;
    this.checkMark.x = this.size * 0.1;
    this.checkMark.visible = this.checked;

    this.container.addChild(this.checkMark);
  }

  #addTitle() {
    const style = new TextStyle({
      fontFamily: "Roboto",
      fontSize: 18,
      align: "left",
    });

    this.titleText = new Text({ text: this.title, style });
    this.titleText.x = this.size + 8; // Space between checkbox and text
    this.titleText.y = (this.size - this.titleText.height) / 2;

    this.addChild(this.titleText);
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
