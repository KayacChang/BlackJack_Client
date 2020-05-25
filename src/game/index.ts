import { Application } from 'pixi.js';
import { Resource } from './core';
import Main from './main';

// === Game Client ===
export default async function (view: HTMLCanvasElement) {
  //
  const app = new Application({
    width: 1280,
    height: 720,
    view,
    resolution: window.devicePixelRatio || 1,
  });

  onInit(app);
}

async function onInit(app: Application) {
  //
  await Resource.load(Main.resources);

  onStart(app);
}

function onStart(app: Application) {}

function onUpdate(delta: number) {}
