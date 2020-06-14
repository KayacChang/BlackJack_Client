import { Application } from 'pixi.js';
import { getSize, resize } from './screen';

import * as PIXI from 'pixi.js';
window.PIXI = PIXI;

export default function (view: HTMLCanvasElement) {
  //
  const app = new Application({
    view,
    ...getSize(),
    resolution: window.devicePixelRatio || 1,
  });

  app.ticker.add(resize(app));

  return app;
}
