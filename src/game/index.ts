import { Application, Sprite } from "pixi.js";
import BG_URL from "./bg.jpg";
import { Package } from "./resource";

const ratio = 16 / 9;

// === Game Client ===
export default async function (view: HTMLCanvasElement) {
  // Init App
  const app = new Application({
    width: window.innerHeight * ratio,
    height: window.innerHeight,
    view,
  });

  // Resize
  window.addEventListener("resize", () => app.resize());

  const pkg = new Package("main");

  await pkg.load({
    background: BG_URL,
  });

  const res = pkg.getRes("background");

  const background = new Sprite(res.texture);
  background.width = app.screen.width;
  background.height = app.screen.height;
  app.stage.addChild(background);
}
