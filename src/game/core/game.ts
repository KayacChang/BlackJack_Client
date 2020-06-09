import { Application } from 'pixi.js';
import { getSize, resize } from './screen';

import { Node } from '.';
import render from './render';

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

interface Scene {
  name: string;
  stage: Node;
  onCreate: (app: Application) => void;
}

export function load(app: Application, scene: Scene) {
  app.stage = render(scene.name, scene.stage);

  scene.onCreate(app);
}
