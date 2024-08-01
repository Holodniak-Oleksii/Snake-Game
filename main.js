import "./style.css";

import { Application } from "pixi.js";

(async () => {
  const app = new Application();

  await app.init({ background: "#1099bb", width: 500, height: 500 });

  document.body.appendChild(app.canvas);
})();
