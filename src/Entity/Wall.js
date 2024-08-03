import { Container, Graphics } from "pixi.js";

class Wall extends Container {
  constructor() {
    super();
    this.cells = [];
    this.cellSize = 20;
  }

  addCell(x, y) {
    const cell = { x, y };
    this.cells.push(cell);
    this.draw();
  }

  draw() {
    this.removeChildren();
    this.cells.forEach((cell) => {
      const wallGraphics = new Graphics()
        .rect(cell.x, cell.y, this.cellSize, this.cellSize)
        .fill(0x808080);
      this.addChild(wallGraphics);
    });
  }

  checkCollision(x, y) {
    return this.cells.some((cell) => cell.x === x && cell.y === y);
  }
}

export default Wall;
