import { Container } from 'pixi.js';
import { Hand, SEAT, PAIR } from '../../../models';
import { createHandService, HandsState } from './state';
import Poker from './Poker';

// const dealPoint = { x: 2515, y: 160 };

const config = {
  [SEAT.A]: { x: 443, y: 630 },
  [SEAT.B]: { x: 888, y: 880 },
  [SEAT.C]: { x: 1480, y: 980 },
  [SEAT.D]: { x: 2072, y: 880 },
  [SEAT.E]: { x: 2515, y: 630 },
  [SEAT.DEALER]: { x: 1480, y: 330 },
};

export default function Game() {
  const container = new Container();
  container.name = 'game';

  for (const [id, end] of Object.entries(config)) {
    const seatID = Number(id) as SEAT;

    const service = createHandService(seatID);

    const hands = new Container();
    container.addChild(hands);

    service.onTransition(update(seatID, hands));

    service.start();
  }

  return container;
}

function update(id: SEAT, hands: Container) {
  //
  let records: Record<PAIR, Poker[]> = {
    [PAIR.L]: [],
    [PAIR.R]: [],
  };

  return function update(state: HandsState) {
    //
    if (!state.changed) {
      return;
    }

    if (state.matches('idle')) {
      hands.removeChildren();

      records = {
        [PAIR.L]: [],
        [PAIR.R]: [],
      };

      return;
    }

    if (state.matches('normal')) {
      //
      // for (const { pair, card } of state.context.latest) {
      // records[pair] = [...records[pair], new Poker(card.suit, card.rank)];
      // }

      // console.log(id, records);

      return;
    }

    if (state.matches('split')) {
      return;
    }
  };
}
