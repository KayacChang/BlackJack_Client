import { Application } from "pixi.js";
import { Resource } from "./core";
import BG from "./bg.jpg";
import Main from "./main";

// === Game Client ===
export default async function (view: HTMLCanvasElement) {
  // Init App
  const app = new Application({
    width: 2560,
    height: 1440,
    view,
    resolution: window.devicePixelRatio || 1,
  });

  const res = {
    BG_IMG: BG,
  };

  await Resource.load(res);

  const main = new Main();

  app.stage = main.view;
}
