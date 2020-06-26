import { Container } from 'pixi.js';
import Paths from '../path';
import { observe } from '../../../store';
import { Hand, Card, SEAT } from '../../../models';
import { propEq } from 'ramda';
import Path from '../path/Path';
import Poker from './Poker';

export default function Game() {
  const container = new Container();
  container.name = 'game';

  const paths = Paths();
  // container.addChild(paths);

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

  function getPath(id: SEAT) {
    const found = paths.children.find(propEq('name', String(id))) as Container;

    const next = pre[id].length;

    return found.children[next] as Path;
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
