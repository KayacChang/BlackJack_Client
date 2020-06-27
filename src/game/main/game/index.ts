import { Container } from 'pixi.js';
import { observe } from '../../../store';
import { Hand, Card, SEAT } from '../../../models';
import Path from './Path';
import Poker from './Poker';
import gsap from 'gsap';
import { whenVisibilityChange } from '../../../utils';
import Score from './Score';

const dealPoint = { x: 2515, y: 160 };

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

  const paths = new Container();
  for (const [id, end] of Object.entries(config)) {
    const path = new Path();

    path.name = id;
    path.points = [dealPoint, end];

    paths.addChild(path);
  }

  const pokers = new Container();
  pokers.name = 'pokers';
  container.addChild(pokers);

  const scores = new Container();
  scores.name = 'scores';
  container.addChild(scores);

  observe((state) => state.hand, state(paths, pokers, scores));

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

function Scores(): Record<SEAT, number> {
  return {
    [SEAT.A]: 0,
    [SEAT.B]: 0,
    [SEAT.C]: 0,
    [SEAT.D]: 0,
    [SEAT.E]: 0,
    [SEAT.DEALER]: 0,
  };
}

function getPath(paths: Container, id: SEAT, nextIdx: number) {
  const path = paths.getChildByName(String(id)) as Path;

  const target = config[id];

  const offsetX = -100;
  const nextX = 50;

  const end = {
    x: target.x + offsetX + nextX * nextIdx,
    y: target.y,
  };

  path.points = [dealPoint, end];

  return path;
}

function sort(hands: Hand[]) {
  const by_ID_Desc = (a: Hand, b: Hand) => b.id - a.id;

  const dealer = hands.findIndex(({ id }) => id === SEAT.DEALER);

  return [
    //
    ...hands.slice(0, dealer).sort(by_ID_Desc),
    hands[dealer],
    ...hands.slice(dealer + 1).sort(by_ID_Desc),
  ];
}

function state(paths: Container, pokers: Container, scoresGroup: Container) {
  let pre = Hands();
  let scores = Scores();

  let outer: gsap.core.Timeline;

  return async function update(hands: Hand[]) {
    //
    if (hands.length === 0) {
      pre = Hands();
      scores = Scores();
      pokers.removeChildren();
      scoresGroup.removeChildren();

      return;
    }

    hands = sort(hands);

    if (outer) {
      outer.seek(outer.endTime(), false);
    }

    outer = gsap.timeline();

    for (const { id, card, points } of hands) {
      const { suit, rank } = card;

      const poker = new Poker(suit, rank);
      poker.alpha = 0;
      pokers.addChild(poker);

      pre[id].push(card);
      scores[id] = Math.max(scores[id], points);

      const path = getPath(paths, id, pre[id].length - 1);

      outer.add(path.attach(poker));
      outer.add(gsap.to(poker, { alpha: 1 }), '<');
    }

    const clear = whenVisibilityChange((pass) => outer.seek(pass / 1000, false));

    await outer;

    clear();

    for (const [id, score] of Object.entries(scores)) {
      if (score === 0) continue;

      const view = Score(score);
      view.name = id;
      const { x, y } = config[Number(id) as SEAT];
      view.position.set(x, y + 75);

      scoresGroup.removeChild(scoresGroup.getChildByName(id));
      scoresGroup.addChild(view);
    }
  };
}
