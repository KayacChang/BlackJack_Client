import Entity from './Entity';
import { Container, DisplayObject } from 'pixi.js';

type Schema = {
  [name: string]: Data;
};

type Data = {
  components: {};
  children?: Schema;
};

export function initEntities(schema: Schema): [Entity[], Container] {
  //
  const pool = [];

  const root = new Container();

  for (const [name, data] of Object.entries(schema)) {
    //
    if (data.children) {
      const [entities, group] = initEntities(data.children);

      pool.push(...entities);

      root.addChild(group);
    }

    const entity = new Entity({ name, components: data.components });
    pool.push(entity);

    if (entity.components.has('render')) {
      const render = entity.components.get('render') as DisplayObject;

      root.addChild(render);
    }
  }

  return [pool, root];
}
