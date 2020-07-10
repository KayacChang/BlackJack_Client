import { Container, DisplayObject } from 'pixi.js';
import { SEAT, PAIR } from '../../../models';
import { createHandService, HandsState } from './state';
import Poker from './Poker';
import gsap from 'gsap';

const origin = { x: 2515, y: 160 };

const config = {
  normal: {
    [SEAT.A]: { x: 443, y: 630 },
    [SEAT.B]: { x: 888, y: 880 },
    [SEAT.C]: { x: 1480, y: 980 },
    [SEAT.D]: { x: 2072, y: 880 },
    [SEAT.E]: { x: 2515, y: 630 },
    [SEAT.DEALER]: { x: 1480, y: 330 },
  },
  split: {
    [SEAT.A]: {
      [PAIR.L]: { x: 263, y: 630 },
      [PAIR.R]: { x: 623, y: 630 },
    },
    [SEAT.B]: {
      [PAIR.L]: { x: 708, y: 880 },
      [PAIR.R]: { x: 1068, y: 880 },
    },
    [SEAT.C]: {
      [PAIR.L]: { x: 1300, y: 980 },
      [PAIR.R]: { x: 1660, y: 980 },
    },
    [SEAT.D]: {
      [PAIR.L]: { x: 1892, y: 880 },
      [PAIR.R]: { x: 2252, y: 880 },
    },
    [SEAT.E]: {
      [PAIR.L]: { x: 2335, y: 630 },
      [PAIR.R]: { x: 2695, y: 630 },
    },
    [SEAT.DEALER]: {
      [PAIR.L]: { x: 1480, y: 330 },
      [PAIR.R]: { x: 1480, y: 330 },
    },
  },
};

export default function Game() {
  const container = new Container();
  container.name = 'game';

  for (const id in SEAT) {
    if (isNaN(Number(id))) {
      continue;
    }

    const hands = new Container();
    container.addChild(hands);

    const seatID = Number(id) as SEAT;
    createHandService(seatID).onTransition(update(seatID, hands)).start();
  }

  return container;
}

function tween<T extends DisplayObject>(element: T, options = {}) {
  return gsap.to(element, { duration: 0.8, ease: 'expo.out', ...options });
}

function move(pokers: Poker[], end: { x: number; y: number }) {
  const offset = 50;
  const mid = pokers.length === 1 ? 0 : Math.round(pokers.length / 2) - 0.5;

  return pokers.map((child, index) => tween(child, { x: end.x + offset * (index - mid), y: end.y, alpha: 1 }));
}

function update(id: SEAT, layer: Container) {
  //
  const mapping = new Map<string, Poker>();

  let hands: Record<PAIR, Poker[]> = {
    [PAIR.L]: [],
    [PAIR.R]: [],
  };

  return function update(state: HandsState) {
    if (!state.changed) {
      return;
    }

    if (state.matches('idle')) {
      layer.removeChildren();
      hands = {
        [PAIR.L]: [],
        [PAIR.R]: [],
      };
      mapping.clear();

      return;
    }

    if (state.matches('normal') && state.context.latest.length > 0) {
      //
      for (const hand of state.context.latest) {
        const { suit, rank } = hand.card;

        const poker = new Poker(suit, rank);
        poker.alpha = 0;
        poker.position.set(origin.x, origin.y);
        layer.addChild(poker);

        mapping.set(hand.id, poker);
        hands[hand.pair] = [...hands[hand.pair], poker];
      }

      move(hands[PAIR.L], config['normal'][id]);

      return;
    }

    if (state.matches('split') && state.context.latest.length === 0) {
      //
      hands = {
        [PAIR.L]: [],
        [PAIR.R]: [],
      };

      for (const hand of state.context.history) {
        //
        const poker = mapping.get(hand.id);
        if (!poker) {
          continue;
        }

        hands[hand.pair] = [...hands[hand.pair], poker];
      }

      move(hands[PAIR.L], config['split'][id][PAIR.L]);
      move(hands[PAIR.R], config['split'][id][PAIR.R]);

      return;
    }

    if (state.matches('split') && state.context.latest.length > 0) {
      //
      for (const hand of state.context.latest) {
        const { suit, rank } = hand.card;

        const poker = new Poker(suit, rank);
        poker.alpha = 0;
        poker.position.set(origin.x, origin.y);
        layer.addChild(poker);

        mapping.set(hand.id, poker);
        hands[hand.pair] = [...hands[hand.pair], poker];
      }

      move(hands[PAIR.L], config['split'][id][PAIR.L]);
      move(hands[PAIR.R], config['split'][id][PAIR.R]);

      return;
    }
  };
}
