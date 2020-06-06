import { Graphics, DisplayObject } from 'pixi.js';
import { mergeWith, add } from 'ramda';
import gsap from 'gsap';
import { Expo } from 'gsap/gsap-core';
import { isArray } from 'util';

type Point = {
  x: number;
  y: number;
};

function line(start: Point, end: Point, it: Graphics) {
  const color = 0x000000;
  const width = 5;

  return (
    it
      //
      .lineStyle(width, color)
      .moveTo(start.x, start.y)
      .lineTo(end.x, end.y)
  );
}

function circle(center: Point, it: Graphics) {
  const color = 0x000000;
  const radius = 5;

  return (
    it
      //
      .beginFill(color)
      .drawCircle(center.x, center.y, radius)
      .endFill()
  );
}

function bezierCurve(start: Point, controlA: Point, controlB: Point, end: Point, it: Graphics) {
  const color = 0x000000;
  const width = 5;

  return (
    it
      //
      .lineStyle(width, color)
      .moveTo(start.x, start.y)
      .bezierCurveTo(controlA.x, controlA.y, controlB.x, controlB.y, end.x, end.y)
  );
}

/**
 * [
        { x: 0, y: 0 },
        [
          { x: -1000 * 0.5, y: 0 },
          { x: -1000 * 0.5, y: 700 },
        ],
        { x: -1000, y: 700 },
    ]
 */
export default class Path extends Graphics {
  //
  points: (Point | Point[])[];

  constructor(points: (Point | Point[])[]) {
    super();

    this.points = points;

    // Start
    const start = points[0] as Point;
    circle(start, this);

    // End
    const end = points[points.length - 1] as Point;
    circle(end, this);

    this.drawLine(points);
  }

  drawLine(points: (Point | Point[])[]) {
    //
    if (points.length <= 1) {
      return;
    }

    if (points.length <= 2) {
      const [start, end] = points as Point[];

      line(start, end, this);

      return;
    }

    for (let i = 0; i < points.length; i += 2) {
      //
      const start = points[i] as Point;
      const point = points[i + 1];
      const end = points[i + 2] as Point;

      if (isArray(point)) {
        const [pointA, pointB] = point as Point[];

        bezierCurve(start, pointA, pointB, end, this);
      }
    }
  }

  attach(target: DisplayObject, duration = 2, ease: string | gsap.EaseFunction = Expo.easeOut) {
    const { x, y } = this;

    const path = this.points.flat().map(mergeWith(add, { x, y }));
    const type = this.points.length > 2 ? 'cubic' : undefined;

    gsap.from(target, { ...path[0] });

    gsap.to(target, { motionPath: { type, path }, duration, ease });
  }
}
