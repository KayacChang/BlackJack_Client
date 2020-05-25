type Props = {
  x?: number;
  y?: number;
};

export class Vec2 {
  //
  x: number;
  y: number;

  constructor({ x = 0, y = 0 }: Props) {
    //
    this.x = x;
    this.y = y;
  }
}
