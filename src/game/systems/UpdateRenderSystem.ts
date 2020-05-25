import { Entity } from '../core';
import { DisplayObject } from 'pixi.js';

export default function UpdateRenderSystem(delta: number, entity: Entity) {
  const transform = entity.components.get('transform') as TransformComponent;
  const render = entity.components.get('render') as DisplayObject;

  render.x = transform.position.x;
  render.y = transform.position.y;

  render.scale.x = transform.scale.x;
  render.scale.y = transform.scale.y;
}
