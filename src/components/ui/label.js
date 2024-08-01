import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { MENU_WIDTH } from "../..";

class Label extends Container {
  constructor(title, value, bgColor = 0x9ed700) {
    super();

    this.bgColor = bgColor;
    this.labelHeight = 50;

    this.titleText = new Text({ text: title });
    this.valueText = new Text({ text: value });

    this.#draw();
  }

  #draw() {
    this.#addBackground();
    this.#addText(this.titleText, 20, "left");
    this.#addText(this.valueText, 20, "right");
  }

  #addBackground() {
    const background = new Graphics();
    background.rect(0, 0, MENU_WIDTH, this.labelHeight);
    background.fill(this.bgColor);

    this.addChild(background);
  }

  #addText(textElement, offsetX, align = "left") {
    const style = new TextStyle({
      fontFamily: "Roboto",
      fontSize: 16,
    });

    textElement.style = style;

    textElement.position.set(
      align === "left" ? offsetX : MENU_WIDTH - textElement.width - offsetX,
      this.labelHeight / 2 - textElement.height / 2
    );

    this.addChild(textElement);
  }
  setValue(value) {
    this.valueText.text = value;
  }
}

export default Label;
