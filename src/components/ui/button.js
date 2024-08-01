import { Container, Graphics, Text } from "pixi.js";

class Button extends Container {
  constructor(text, onClick, style = {}) {
    super();

    this.label = new Text(text, {
      fontSize: style.fontSize || 24,
      fill: style.textColor || 0xffffff,
      align: "center",
    });
    this.label.anchor.set(0.5);

    const padding = 16;
    const textWidth = this.label.width;
    const textHeight = this.label.height;

    const buttonWidth = style.width || textWidth + padding * 2;
    const buttonHeight = style.height || textHeight + padding * 2;

    this.background = new Graphics();
    this.background.roundRect(
      0,
      0,
      buttonWidth,
      buttonHeight,
      style.radius || 10
    );
    this.background.fill(style.backgroundColor || 0x3498db);
    this.addChild(this.background);

    this.label.x = buttonWidth / 2;
    this.label.y = buttonHeight / 2;
    this.addChild(this.label);

    this.x = style.x || 0;
    this.y = style.y || 0;

    this.onClick = onClick;
    this.interactive = true;
    this.buttonMode = true;
    this.cursor = "pointer";
    this.on("pointerdown", this.handleClick.bind(this));
  }

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}

export default Button;
