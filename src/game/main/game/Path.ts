import { Graphics, DisplayObject, Point } from 'pixi.js';
import { mergeWith, add } from 'ramda';
import gsap from 'gsap';
import { Expo } from 'gsap/gsap-core';
import { isArray } from 'util';
import { circle, line, bezierCurve } from '../../core/utils';
import { Vec2 } from '../../../models';

export default class Path extends Graphics {
  //
  tint = 0x007cff;

  private _points: Vec2[] = [];
  get points(): Vec2[] {
    return this._points;
  }
  set points(points: Vec2[]) {
    this._points = points;

    if (points.length <= 1) {
      return;
    }

    this.clear();

    // Start
    const start = points[0] as Point;
    circle(start, this);

    // End
    const end = points[points.length - 1] as Point;
    circle(end, this);

    this.drawLine(points);
  }

  drawLine(points: Vec2[]) {
    //
    if (points.length <= 2) {
      const [start, end] = points as Point[];

      line({ start, end }, this);

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

  attach(target: DisplayObject, duration = 1, ease: string | gsap.EaseFunction = Expo.easeOut) {
    const { x, y } = this;

    const path = this.points.flat().map(mergeWith(add, { x, y }));
    const type = this.points.length > 2 ? 'cubic' : undefined;

    Object.assign(target, path[0]);

    return gsap.to(target, { motionPath: { type, path }, duration, ease });
  }
}
