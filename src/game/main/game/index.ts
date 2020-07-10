import { Container, DisplayObject } from "pixi.js";
import { SEAT, PAIR } from "../../../models";
import { createHandService, HandsState } from "./state";
import Poker from "./Poker";
import gsap from "gsap";

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
      [PAIR.L]: { x: 243, y: 630 },
      [PAIR.R]: { x: 643, y: 630 },
    },
    [SEAT.B]: {
      [PAIR.L]: { x: 688, y: 880 },
      [PAIR.R]: { x: 1088, y: 880 },
    },
    [SEAT.C]: {
      [PAIR.L]: { x: 1280, y: 980 },
      [PAIR.R]: { x: 1680, y: 980 },
    },
    [SEAT.D]: {
      [PAIR.L]: { x: 1872, y: 880 },
      [PAIR.R]: { x: 2272, y: 880 },
    },
    [SEAT.E]: {
      [PAIR.L]: { x: 2315, y: 630 },
      [PAIR.R]: { x: 2715, y: 630 },
    },
    [SEAT.DEALER]: {
      [PAIR.L]: { x: 1480, y: 330 },
      [PAIR.R]: { x: 1480, y: 330 },
    },
  },
};

export default function Game() {
  const container = new Container();
  container.name = "game";

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
  return gsap.to(element, { duration: 0.8, ease: "expo.out", ...options });
}

function dealTo(hands: Container) {
  //
  return function deal(poker: Poker, end: { x: number; y: number }) {
    poker.position.set(origin.x, origin.y);
    poker.alpha = 0;
    hands.addChild(poker);

    const offset = 50;
    const mid =
      hands.children.length === 1
        ? 0
        : Math.round(hands.children.length / 2) - 0.5;

    return hands.children.map((child, index) =>
      tween(child, { x: end.x + offset * (index - mid), y: end.y, alpha: 1 })
    );
  };
}

function update(id: SEAT, hands: Container) {
  //
  const deal = dealTo(hands);

  return function update(state: HandsState) {
    if (!state.changed) {
      return;
    }

    if (state.matches("idle")) {
      hands.removeChildren();

      return;
    }

    if (state.matches("normal") && state.context.latest) {
      for (const hand of state.context.latest) {
        const { suit, rank } = hand.card;

        const poker = new Poker(suit, rank);

        deal(poker, config["normal"][id]);
      }

      return;
    }

    if (state.matches("split") && state.context.latest) {
      for (const hand of state.context.latest) {
        const { suit, rank } = hand.card;

        const poker = new Poker(suit, rank);

        deal(poker, config["split"][id][hand.pair]);
      }

      return;
    }
  };
}
