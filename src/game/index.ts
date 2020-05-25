import { Application } from 'pixi.js';
import { Resource, initEntities, Entity } from './core';
import Main from './main';
import { TransformSystem, System } from './systems';

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

  const [entities, root] = initEntities(Main.stage);

  app.stage = root;

  onStart(app, entities);
}

function onStart(app: Application, entities: Entity[]) {
  //
  const systems = [
    //
    new TransformSystem(),
  ];

  app.ticker.add((delta) => onUpdate(delta, systems, entities));
}

function onUpdate(delta: number, systems: System[], entities: Entity[]) {
  //
  for (const entity of entities) {
    //
    for (const system of systems) {
      //
      if (system.match(entity)) {
        system.update(delta, entity);
      }
    }
  }
}
