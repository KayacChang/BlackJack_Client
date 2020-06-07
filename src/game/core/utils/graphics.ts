import { Graphics } from 'pixi.js';
import { Vec2 } from '..';

export function line(start: Vec2, end: Vec2, it: Graphics) {
  const color = 0x000000;
  const width = 5;

  return (
    it
      //
      .lineStyle(width, color)
      .moveTo(start.x || 0, start.y || 0)
      .lineTo(end.x || 0, end.y || 0)
  );
}

export function circle(center: Vec2, it: Graphics) {
  const color = 0x000000;
  const radius = 5;

  return (
    it
      //
      .beginFill(color)
      .drawCircle(center.x || 0, center.y || 0, radius)
      .endFill()
  );
}

export function bezierCurve(start: Vec2, controlA: Vec2, controlB: Vec2, end: Vec2, it: Graphics) {
  const color = 0x000000;
  const width = 5;

  return (
    it
      //
      .lineStyle(width, color)
      .moveTo(start.x || 0, start.y || 0)
      .bezierCurveTo(
        //
        controlA.x || 0,
        controlA.y || 0,
        //
        controlB.x || 0,
        controlB.y || 0,
        //
        end.x || 0,
        end.y || 0
      )
  );
}