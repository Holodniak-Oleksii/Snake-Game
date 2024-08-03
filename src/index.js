import MainScene from "@/Main";
import { Application, Assets } from "pixi.js";
import manifest from "../manifest.json";

export const SCREEN_WIDTH = 940;
export const SCREEN_HEIGHT = 640;
export const MENU_WIDTH = 300;
export const BOARD_SIZE = SCREEN_WIDTH - MENU_WIDTH;

export const GAME_MODE = {
  CLASSIC: "Classic",
  NO_DIE: "No Die",
  WALLS: "Walls",
  PORTAL: "Portal",
  SPEED: "Speed",
};

const start = async () => {
  const app = new Application();
  globalThis.__PIXI_APP__ = app;

  await app.init({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  document.body.appendChild(app.canvas);

  await Assets.init({ manifest });
  await Assets.loadBundle("fonts");

  const mainScreen = new MainScene(app);

  app.ticker.add((delta) => {
    mainScreen.update(delta);
  });
};

export default start;
