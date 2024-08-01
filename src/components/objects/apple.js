import { BOARD_SIZE } from "@/";
import { Container, Graphics } from "pixi.js";

class Apple extends Container {
  constructor() {
    super();
    this.size = 20;
    this.position.set(
      Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size,
      Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size
    );

    this.draw();
  }

  draw() {
    this.removeChildren();
    const appleGraphics = new Graphics()
      .rect(0, 0, this.size, this.size)
      .fill(0xff0000);
    this.addChild(appleGraphics);
  }

  reposition() {
    this.position.set(
      Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size,
      Math.floor(Math.random() * (BOARD_SIZE / this.size)) * this.size
    );
  }
}

export default Apple;
