import { Container, Graphics } from "pixi.js";

class Snake extends Container {
  constructor() {
    super();
    this.segmentSize = 20;
    this.direction = "right";
    this.body = [{ x: 0, y: 0 }];
    this.speed = 100;
    this.lastMoveTime = 0;
    this.growing = false;

    this.draw();
  }

  draw() {
    this.removeChildren();
    this.body.forEach((segment) => {
      const segmentGraphics = new Graphics()
        .rect(segment.x, segment.y, this.segmentSize, this.segmentSize)
        .fill(0x00ff00);
      this.addChild(segmentGraphics);
    });
  }

  move(delta) {
    this.lastMoveTime += delta.deltaTime;
    const moveInterval = 1000 / this.speed;

    if (this.lastMoveTime >= moveInterval) {
      let newSegment = { ...this.body[0] };
      switch (this.direction) {
        case "up":
          newSegment.y -= this.segmentSize;
          break;
        case "down":
          newSegment.y += this.segmentSize;
          break;
        case "left":
          newSegment.x -= this.segmentSize;
          break;
        case "right":
          newSegment.x += this.segmentSize;
          break;
      }

      this.body.unshift(newSegment);

      if (!this.growing) {
        this.body.pop();
      } else {
        this.growing = false;
      }

      this.draw();
      this.lastMoveTime = 0;
    }
  }

  grow() {
    this.growing = true;
  }

  setDirection(newDirection) {
    const allowedDirections = {
      up: ["left", "right"],
      down: ["left", "right"],
      left: ["up", "down"],
      right: ["up", "down"],
    };

    if (allowedDirections[this.direction].includes(newDirection)) {
      this.direction = newDirection;
    }
  }
}

export default Snake;
