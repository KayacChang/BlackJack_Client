//
import { Vec2 } from '../core';

type VProps = {
  x?: number;
  y?: number;
};

type Props = {
  position?: VProps;
  rotation?: VProps;
  scale?: VProps;
};

export default class Transform {
  //
  position: Vec2;
  rotation: Vec2;
  scale: Vec2;

  constructor(comp: Props) {
    //
    this.position = new Vec2({
      x: comp.position?.x || 0,
      y: comp.position?.y || 0,
    });

    this.rotation = new Vec2({
      x: comp.rotation?.x || 0,
      y: comp.rotation?.y || 0,
    });

    this.scale = new Vec2({
      x: comp.scale?.x || 1,
      y: comp.scale?.y || 1,
    });
  }
}
