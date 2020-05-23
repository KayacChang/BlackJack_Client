import { Application, DisplayObject } from 'pixi.js';
import { Resource, initEntities, Entity } from './core';
import BG from './bg.jpg';
import Main from './main';

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

  onInit(app);
}

function onInit(app: Application) {
  //
  const [entities, root] = initEntities(Main);

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
    //
  }
}

function UpdateRenderSystem(delta: number, entity: Entity) {
  //
  const transform = entity.components.get('transform') as TransformComponent;
  const render = entity.components.get('render') as DisplayObject;

  render.x = transform.position.x;
  render.y = transform.position.y;

  render.scale.x = transform.scale.x;
  render.scale.y = transform.scale.y;
}
