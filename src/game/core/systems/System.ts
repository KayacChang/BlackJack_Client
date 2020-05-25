import { Entity } from '..';

export default abstract class System {
  abstract match(entity: Entity): boolean;
  abstract update(delta: number, entity: Entity): Entity;
}
