import { Container, Graphics, Text, Texture } from "pixi.js";

class Button extends Container {
  constructor({ text = "", onClick = () => {}, style = {} }) {
    super();
    this.label = new Text({
      text,
      style: {
        fontFamily: "Bulgarian-Bridge",
        fontSize: style.fontSize || 26,
        fill: 0xffffff,
        stroke: 0x000000,

        align: "center",
      },
    });
    this.label.anchor.set(0.5);

    const padding = 16;
    const textWidth = this.label.width;
    const textHeight = this.label.height;

    this.buttonWidth = style.width || textWidth + padding * 2;
    this.buttonHeight = style.height || textHeight + padding;

    this.background = new Graphics();
    this.drawBackground(
      style.backgroundColor || [0x00ff00, 0x858174],
      style.radius || 40
    );

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

  drawBackground(color, radius) {
    const [startColor, endColor] = color;

    const gradientTexture = this.createGradientTexture(startColor, endColor);

    this.background.clear();
    this.background.roundRect(
      0,
      0,
      this.buttonWidth,
      this.buttonHeight,
      radius
    );
    this.background.fill({ texture: gradientTexture });
  }

  createGradientTexture(startColor, endColor) {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, `#${startColor.toString(16).padStart(6, "0")}`);
    gradient.addColorStop(1, `#${endColor.toString(16).padStart(6, "0")}`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return Texture.from(canvas);
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
