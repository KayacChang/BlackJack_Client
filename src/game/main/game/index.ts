import { Container } from 'pixi.js';
import { observe } from '../../../store';
import { Hand, Card, SEAT } from '../../../models';
import Path from './Path';
import Poker from './Poker';

const config = {
  //
  [SEAT.A]: [
    { x: 2515, y: 160 },
    { x: 443 - 100, y: 630 },
  ],

  //
  [SEAT.B]: [
    { x: 2515, y: 160 },
    { x: 888 - 100, y: 880 },
  ],

  //
  [SEAT.C]: [
    { x: 2515, y: 160 },
    { x: 1480 - 100, y: 980 },
  ],

  //
  [SEAT.D]: [
    { x: 2515, y: 160 },
    { x: 2072 - 100, y: 880 },
  ],

  //
  [SEAT.E]: [
    { x: 2515, y: 160 },
    { x: 2515 - 100, y: 630 },
  ],

  //
  [SEAT.DEALER]: [
    { x: 2515, y: 160 },
    { x: 1480 - 100, y: 330 },
  ],
};

function Paths() {
  const container = new Container();
  container.name = 'paths';

  for (const [id, paths] of Object.entries(config)) {
    const path = new Path();

    path.name = id;
    path.points = paths;

    container.addChild(path);
  }

  return container;
}

export default function Game() {
  const container = new Container();
  container.name = 'game';

  const paths = Paths();

  const pokers = new Container();
  pokers.name = 'pokers';
  container.addChild(pokers);

  observe((state) => state.hand, state(paths, pokers));

  return container;
}

function Hands(): Record<SEAT, Card[]> {
  return {
    [SEAT.A]: [],
    [SEAT.B]: [],
    [SEAT.C]: [],
    [SEAT.D]: [],
    [SEAT.E]: [],
    [SEAT.DEALER]: [],
  };
}

function state(paths: Container, pokers: Container) {
  //
  let pre = Hands();

  const offsetX = 50;

  function getPath(id: SEAT) {
    const path = paths.getChildByName(String(id)) as Path;

    const [start, end] = config[id];

    path.points = [start, { x: end.x + offsetX * pre[id].length, y: end.y }];

    return path;
  }

  return async function update(hands: Hand[]) {
    //
    if (hands.length === 0) {
      pre = Hands();

      pokers.removeChildren();
    }

    hands = hands.sort((a, b) => b.id - a.id);

    for (const { id, card } of hands) {
      const { suit, rank } = card;

      const poker = new Poker(suit, rank);

      pokers.addChild(poker);

      await getPath(id).attach(poker);

      pre[id].push(card);
    }
  };
}
