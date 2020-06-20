import { Container } from 'pixi.js';
import Paths from '../path';
import Pokers from './pokers';
import { observe } from '../../../store';
import { Hand, Card, SEAT } from '../../../models';
import { propEq, without } from 'ramda';
import Path from '../path/Path';
import Poker from '../../components/Poker';

export default function Game() {
  const container = new Container();
  container.name = 'game';

  const paths = Paths();
  container.addChild(paths);

  const pokers = Pokers();
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

  function toHands(hands: Hand[]) {
    return hands.reduce((config, { id, cards }) => ((config[id] = cards), config), Hands());
  }

  function getPath(id: SEAT) {
    const found = paths.children.find(propEq('name', String(id))) as Container;

    const next = pre[id].length;

    return found.children[next] as Path;
  }

  return function update(hands: Hand[]) {
    //
    for (const { id, cards } of hands) {
      //
      const diff = without(pre[id], cards);

      for (const { suit, rank } of diff) {
        const path = getPath(id);

        const poker = new Poker(suit, rank);

        pokers.addChild(poker);

        path.attach(poker);
      }
    }

    pre = toHands(hands);
  };
}
