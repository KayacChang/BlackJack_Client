import { Container } from 'pixi.js';
import { SEAT } from '../../../models';
import { toPairs, map, construct, assoc } from 'ramda';
import { Vec2 } from '../../components/types';
import Path from './Path';
import { Functor, addChild } from '../../../utils/func';

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

  const paths = map(genPath)(toPairs(config));

  container.addChild(...paths);

  return container;
}

function genPath([name, config]: [string, Vec2[][]]) {
  const children = config.map(construct(Path));

  return (
    Functor(new Container())
      //
      .map(assoc('name', name))
      .flod(addChild(children))
  );
}
