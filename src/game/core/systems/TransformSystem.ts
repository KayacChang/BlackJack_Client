import { Entity } from '..';
import { DisplayObject } from 'pixi.js';
import System from './System';
import { Transform } from '../component';

export default class TransformSystem implements System {
  //
  match(entity: Entity) {
    //
    return (
      entity.components.has('transform') &&
      //
      entity.components.has('render')
    );
  }

  update(delta: number, entity: Entity) {
    //
    const transform = entity.components.get('transform') as Transform;
    const render = entity.components.get('render') as DisplayObject;

    render.x = transform.position.x;
    render.y = transform.position.y;

    render.scale.x = transform.scale.x;
    render.scale.y = transform.scale.y;

    return entity;
  }
}
