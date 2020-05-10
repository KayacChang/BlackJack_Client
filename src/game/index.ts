import { Application, Sprite } from "pixi.js";
import BG_URL from "./bg.jpg";
import { Package } from "./resource";

// === Game Client ===
export default async function (view: HTMLCanvasElement) {
  //
  const app = new Application({
    width: 2560,
    height: 1440,
    view,
  });

  const pkg = new Package("main");

  await pkg.load({
    background: BG_URL,
  });

  const res = pkg.getRes("background");

  const background = new Sprite(res.texture);

  app.stage.addChild(background);
}
