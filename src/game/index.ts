import { Application, Sprite, Loader } from "pixi.js";
import BG_URL from "./bg.jpg";

// === Game Client ===
export default async function (view: HTMLCanvasElement) {
  //
  const app = new Application({
    width: 2560,
    height: 1440,
    view,
  });

  console.log("Init...");

  await load(app);

  console.log(app.loader);
}

async function load(app: Application) {
  app.loader.add("background", BG_URL);

  console.log("Load Begin...");

  await new Promise((resolve, reject) => {
    app.loader.load((_, resources) => resolve(resources));

    app.loader.onError(reject);
  });

  console.log("Load End...");
}
