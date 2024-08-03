import Apple from "./Apple";

class Portal {
  constructor(snake) {
    this.apple1 = new Apple();
    this.apple2 = new Apple();

    this.reposition(snake);
  }

  reposition(snake) {
    this.apple1.reposition(snake);
    this.apple2.reposition(snake);

    while (
      this.apple1.position.x === this.apple2.position.x &&
      this.apple1.position.y === this.apple2.position.y
    ) {
      this.apple2.reposition(snake);
    }
  }
}

export default Portal;
