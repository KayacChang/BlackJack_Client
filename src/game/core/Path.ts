import { Graphics, DisplayObject } from 'pixi.js';
import { mergeWith, add } from 'ramda';
import gsap from 'gsap';
import { Expo } from 'gsap/gsap-core';
import { isArray } from 'util';
import { Vec2 } from '.';
import { circle, line, bezierCurve } from '../utils';

type Points = (Vec2 | Vec2[])[];

/**
    [
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
  points: Points;

  constructor(points: Points) {
    super();

    this.points = points;

    // Start
    const start = points[0] as Vec2;
    circle(start, this);

    // End
    const end = points[points.length - 1] as Vec2;
    circle(end, this);

    this.drawLine(points);
  }

  drawLine(points: Points) {
    //
    if (points.length <= 1) {
      return;
    }

    if (points.length <= 2) {
      const [start, end] = points as Vec2[];

      line(start, end, this);

      return;
    }

    for (let i = 0; i < points.length; i += 2) {
      //
      const start = points[i] as Vec2;
      const point = points[i + 1];
      const end = points[i + 2] as Vec2;

      if (isArray(point)) {
        const [pointA, pointB] = point as Vec2[];

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
