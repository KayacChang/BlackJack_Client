import { Application } from 'pixi.js';
import { Resource, initEntities, Entity } from './core';
import Main from './main';
import { UpdateRenderSystem } from './ systems';

// === Game Client ===
export default async function (view: HTMLCanvasElement) {
  // Init App
  const app = new Application({
    width: 2560,
    height: 1440,
    view,
    resolution: window.devicePixelRatio || 1,
  });

  await Resource.load(Main.resources);

  onInit(app);
}

function onInit(app: Application) {
  //
  const [entities, root] = initEntities(Main.stage);

  app.stage = root;

  onStart(app, entities);
}

function onStart(app: Application, entities: Entity[]) {
  //
  app.ticker.add(update);

  function update(delta: number) {
    //
    for (const entity of entities) {
      //
      if (entity.components.has('transform') && entity.components.has('render')) {
        UpdateRenderSystem(delta, entity);
      }
    }
  }
}
