import { Container } from 'pixi.js';
import { SEAT } from '../../../models';
import { createHandService, HandsState } from './state';
import Poker from './Poker';
import gsap from 'gsap';

const dealPoint = { x: 2515, y: 160 };

const config = {
  [SEAT.A]: { x: 443, y: 630 },
  [SEAT.B]: { x: 888, y: 880 },
  [SEAT.C]: { x: 1460, y: 980 },
  [SEAT.D]: { x: 2072, y: 880 },
  [SEAT.E]: { x: 2515, y: 630 },
  [SEAT.DEALER]: { x: 1460, y: 330 },
};

export default function Game() {
  const container = new Container();
  container.name = 'game';

  for (const [id, end] of Object.entries(config)) {
    const hands = new Container();
    container.addChild(hands);

    const seatID = Number(id) as SEAT;

    createHandService(seatID).onTransition(update(seatID, hands)).start();
  }

  return container;
}

function update(id: SEAT, hands: Container) {
  //
  function add(poker: Poker) {
    //
    const { x, y } = config[id];
    const offset = 50;

    const mid = hands.children.length === 1 ? 0 : Math.round(hands.children.length / 2) - 0.5;

    poker.position.set(dealPoint.x, dealPoint.y);
    hands.addChild(poker);

    hands.children.forEach((child, index) => {
      gsap.to(child, { x: x + offset * (index - mid), y, duration: 0.8, ease: 'expo.out' });
    });
  }

  return function update(state: HandsState) {
    //
    if (!state.changed) {
      return;
    }

    if (state.matches('idle')) {
      hands.removeChildren();

      return;
    }

    if (state.matches('normal')) {
      if (!state.context.latest) {
        return;
      }
      console.log(id, state.context.latest);

      const { suit, rank } = state.context.latest.card;

      const poker = new Poker(suit, rank);

      add(poker);

      return;
    }

    if (state.matches('split')) {
      return;
    }
  };
}
