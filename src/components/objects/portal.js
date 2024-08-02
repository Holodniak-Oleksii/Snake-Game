import Apple from "./apple";

class Portal {
  constructor(snake) {
    this.apple1 = new Apple();
    this.apple2 = new Apple();

    this.reposition(snake);
  }

  reposition(snake) {
    this.apple1.reposition(snake);
    this.apple2.reposition(snake);

    // Ensure the two apples do not spawn in the same location
    while (
      this.apple1.position.x === this.apple2.position.x &&
      this.apple1.position.y === this.apple2.position.y
    ) {
      this.apple2.reposition(snake);
    }
  }
}

export default Portal;
