import { Graphics, DisplayObject } from 'pixi.js';
import { mergeWith, add } from 'ramda';
import gsap from 'gsap';
import { isArray } from 'util';

type Point = {
  x: number;
  y: number;
};

export default class Path extends Graphics {
  //
  points: (Point | Point[])[];

  constructor(points: (Point | Point[])[]) {
    super();

    this.points = points;

    // Start
    const start = points[0];
    this.circle(start as Point);

    this.drawLine(points);

    // End
    const end = points[points.length - 1];
    this.circle(end as Point);
  }

  drawLine(points: (Point | Point[])[]) {
    //
    for (let i = 0; i < points.length; i += 2) {
      //
      const start = points[i] as Point;
      const point = points[i + 1];
      const end = points[i + 2] as Point;

      if (isArray(point)) {
        const [pointA, pointB] = point as Point[];

        this.bezierCurve(start, pointA, pointB, end);
      }
    }
  }

  private circle(center: Point) {
    const color = 0x000000;
    const radius = 5;

    return (
      this
        //
        .beginFill(color)
        .drawCircle(center.x, center.y, radius)
        .endFill()
    );
  }

  private bezierCurve(start: Point, controlA: Point, controlB: Point, end: Point) {
    const color = 0x000000;
    const width = 5;

    return (
      this
        //
        .lineStyle(width, color)
        .moveTo(start.x, start.y)
        .bezierCurveTo(controlA.x, controlA.y, controlB.x, controlB.y, end.x, end.y)
    );
  }

  attach(target: DisplayObject, duration = 10) {
    const { x, y } = this;

    const path = this.points.flat().map(mergeWith(add, { x, y }));

    return gsap.to(target, {
      motionPath: {
        type: 'cubic',
        path,
      },
      duration,
    });
  }
}
