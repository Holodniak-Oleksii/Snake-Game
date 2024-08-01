import { GAME_MODE } from "..";

class User {
  constructor() {
    if (typeof User.instance === "object") {
      return User.instance;
    }
    this.bestScore = 0;
    this.lastScore = 0;
    this.gameMode = GAME_MODE.CLASSIC;
    User.instance = this;
    return this;
  }

  getBestScore() {
    return this.bestScore;
  }
  getLastScore() {
    return this.lastScore;
  }
  getGameMode() {
    return this.gameMode;
  }

  setBestScore(score) {
    this.bestScore = score;
  }
  setLastScore(score) {
    this.lastScore = score;
  }
  setGameMode(gameMode) {
    this.gameMode = gameMode;
  }
}

export default User;
