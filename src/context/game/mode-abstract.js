class GameMode {
  constructor() {
    if (this.constructor == GameMode) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  run() {
    throw new Error("Method 'run()' must be implemented.");
  }

  start() {
    throw new Error("Method 'start()' must be implemented.");
  }
}

export default GameMode;
