import { Element, Path, Children, Vec2 } from '../core';
import Poker from './components/Poker';
import { mapObjIndexed } from 'ramda';

export default class Game extends Element {
  //
  get view() {
    const points = {
      pathA: [
        { x: 2515, y: 160 },
        { x: 443, y: 630 },
      ],
      pathB: [
        { x: 2515, y: 160 },
        { x: 888, y: 880 },
      ],
      pathC: [
        { x: 2515, y: 160 },
        { x: 1480, y: 980 },
      ],
      pathD: [
        { x: 2515, y: 160 },
        { x: 2072, y: 880 },
      ],
      pathE: [
        { x: 2515, y: 160 },
        { x: 2515, y: 630 },
      ],
    };

    const paths = mapObjIndexed((data: Vec2[]) => new Path(data), points);

    return {
      poker: new Poker('CLUB', 10),

      ...paths,
    };
  }

  onCreate({ poker, pathC, pathD }: Children) {
    (pathC as Path).attach(poker);
  }
}
