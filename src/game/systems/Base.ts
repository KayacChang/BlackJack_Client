import { Entity } from '../core';

export default interface System {
  match(entity: Entity): boolean;
  update(delta: number, entity: Entity): Entity;
}
