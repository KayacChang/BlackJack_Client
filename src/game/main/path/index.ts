import { Container } from 'pixi.js';
import { SEAT } from '../../../models';
import { toPairs, map } from 'ramda';
import { compose } from 'redux';
import { Vec2 } from '../../components/types';
import Path from './Path';

const config: Record<SEAT, Vec2[][]> = {
  //
  [SEAT.A]: [
    [
      { x: 2515, y: 160 },
      { x: 443 - 100, y: 630 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 443 - 50, y: 630 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 443, y: 630 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 443 + 50, y: 630 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 443 + 100, y: 630 },
    ],
  ],
  //
  [SEAT.B]: [
    [
      { x: 2515, y: 160 },
      { x: 888 - 100, y: 880 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 888 - 50, y: 880 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 888, y: 880 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 888 + 50, y: 880 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 888 + 100, y: 880 },
    ],
  ],
  //
  [SEAT.C]: [
    [
      { x: 2515, y: 160 },
      { x: 1480 - 100, y: 980 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 1480 - 50, y: 980 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 1480, y: 980 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 1480 + 50, y: 980 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 1480 + 100, y: 980 },
    ],
  ],
  //
  [SEAT.D]: [
    [
      { x: 2515, y: 160 },
      { x: 2072 - 100, y: 880 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 2072 - 50, y: 880 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 2072, y: 880 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 2072 + 50, y: 880 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 2072 + 100, y: 880 },
    ],
  ],
  //
  [SEAT.E]: [
    [
      { x: 2515, y: 160 },
      { x: 2515 - 100, y: 630 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 2515 - 50, y: 630 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 2515, y: 630 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 2515 + 50, y: 630 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 2515 + 100, y: 630 },
    ],
  ],
  //
  [SEAT.DEALER]: [
    [
      { x: 2515, y: 160 },
      { x: 1480 - 100, y: 330 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 1480 - 50, y: 330 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 1480, y: 330 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 1480 + 50, y: 330 },
    ],
    [
      { x: 2515, y: 160 },
      { x: 1480 + 100, y: 330 },
    ],
  ],
};

export default function Paths() {
  const container = new Container();
  container.name = 'paths';

  const paths = compose(map(genPath), toPairs)(config) as Container[];

  container.addChild(...paths);

  return container;
}

function genPath([name, config]: [SEAT, Vec2[][]]) {
  const group = new Container();

  group.name = SEAT[name];

  const paths = config.map((path) => new Path(path));

  group.addChild(...paths);

  return group;
}
