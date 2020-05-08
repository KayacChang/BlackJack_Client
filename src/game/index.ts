import { Application } from "pixi.js";

// === Game Client ===
export default function (view: HTMLCanvasElement) {
  //
  const app = new Application({
    width: 1920,
    height: 1080,
    view,
  });

  console.log(app);

  console.log(`Init...`);
}
