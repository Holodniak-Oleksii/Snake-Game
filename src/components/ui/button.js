import { Container, Graphics, Text } from "pixi.js";

class Button extends Container {
  constructor({ text = "", onClick = () => {}, style = {} }) {
    super();
    this.label = new Text({
      text,
      style: {
        fontSize: style.fontSize || 24,
        fill: style.textColor || 0xffffff,
        align: "center",
      },
    });
    this.label.anchor.set(0.5);

    const padding = 16;
    const textWidth = this.label.width;
    const textHeight = this.label.height;

    this.buttonWidth = style.width || textWidth + padding * 2;
    this.buttonHeight = style.height || textHeight + padding * 2;

    this.background = new Graphics();
    this.background.fill(style.backgroundColor || 0x3498db);
    this.background.roundRect(
      0,
      0,
      this.buttonWidth,
      this.buttonHeight,
      style.radius || 10
    );
    this.background.endFill();
    this.addChild(this.background);

    this.label.x = this.buttonWidth / 2;
    this.label.y = this.buttonHeight / 2;
    this.addChild(this.label);

    this.x = style.x || 0;
    this.y = style.y || 0;

    this.onClick = onClick;
    this.interactive = true;
    this.buttonMode = true;
    this.cursor = "pointer";
    this.on("pointerdown", this.handleClick.bind(this));
  }
  setText(text) {
    this.label.text = text;
  }
  setEvent(onClick) {
    this.onClick = onClick;
  }
  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}

export default Button;
