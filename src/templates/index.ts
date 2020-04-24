import { Application } from "pixi.js";

// === Export to UI ===
export default function(view: HTMLCanvasElement) {
  //
  return new App(view);
}

// === Game Client ===
class App {
  //
  constructor(view: HTMLCanvasElement) {
    //
    const app = new Application({
      width: 1920,
      height: 1080,
      view
    });

    console.log(app);

    console.log(`Init...`);
  }
}
