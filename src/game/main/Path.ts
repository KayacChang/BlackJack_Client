import { Graphics, DisplayObject } from 'pixi.js';
import gsap from 'gsap';

type Props = {
  width: number;
  color: number;
};

const points = [
  { x: 0, y: 0 },
  { x: 100, y: 200 },
  { x: 200, y: 200 },
  { x: 240, y: 100 },
];

function Circle({ width, color }: Props, it: Graphics) {
  it.beginFill(color);
  it.drawCircle(0, 0, width * 2);
  it.endFill();
}

export default class Path extends Graphics {
  //
  constructor({ width = 5, color = 0x000000 }: Props) {
    super();

    Circle({ color, width }, this);

    this.lineStyle(width, color);
    this.bezierCurveTo(100, 200, 200, 200, 240, 100);

    this.beginFill(color);
    this.drawCircle(240, 100, width * 2);
    this.endFill();
  }

  attach(target: DisplayObject, duration = 10) {
    //
    const self = this;

    return gsap.to(target, {
      motionPath: {
        type: 'cubic',
        path: points.map(({ x, y }) => ({ x: x + self.x, y: y + self.y })),
      },
      duration,
    });
  }
}
