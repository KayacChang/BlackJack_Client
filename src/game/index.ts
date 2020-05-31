import * as PIXI from 'pixi.js';
import { Application } from 'pixi.js';
import Main from './main';
import Res from './assets';
import { isMobile } from '../utils';

window.PIXI = PIXI;

const Quad_HD = Object.freeze({
  width: 2960,
  height: 1440,
  ratio: 2960 / 1440,
});

// === Game Client ===
export default async function (view: HTMLCanvasElement) {
  //
  const app = new Application({
    width: !isMobile() ? Quad_HD.width : window.innerHeight * Quad_HD.ratio,
    height: !isMobile() ? Quad_HD.height : window.innerHeight,
    view,
    resolution: window.devicePixelRatio || 1,
  });

  onLoad(app);
}

async function onLoad(app: Application) {
  //
  await Res.load();

  onStart(app);
}

function onStart(app: Application) {
  //
  app.stage = new Main();

  app.ticker.add(() => resize(app));
}

function resize(app: Application) {
  const x = app.screen.width / Quad_HD.width;
  const y = app.screen.height / Quad_HD.height;

  app.stage.scale.set(x, y);
}
