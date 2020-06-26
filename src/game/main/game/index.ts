import { Container, Graphics } from 'pixi.js';
import { observe } from '../../../store';
import { Hand, Card, SEAT } from '../../../models';
import Path from './Path';
import Poker from './Poker';
import GameText from '../text';

const dealPoint = { x: 2515, y: 160 };

const config = {
  [SEAT.A]: { x: 443, y: 630 },
  [SEAT.B]: { x: 888, y: 880 },
  [SEAT.C]: { x: 1480, y: 980 },
  [SEAT.D]: { x: 2072, y: 880 },
  [SEAT.E]: { x: 2515, y: 630 },
  [SEAT.DEALER]: { x: 1480, y: 330 },
};

function Paths() {
  const container = new Container();

  for (const [id, end] of Object.entries(config)) {
    const path = new Path();

    path.name = id;
    path.points = [dealPoint, end];

    container.addChild(path);
  }

  return container;
}

function Score(score: number) {
  const [width, height] = [108, 76];

  const it = new Container();

  const background = new Graphics();
  background.beginFill(0x000, 0.7);
  background.drawRoundedRect(-0.5 * width, -0.5 * height, width, height, 16);
  background.endFill();
  it.addChild(background);

  const field = GameText(String(score));
  field.anchor.set(0.5);
  it.addChild(field);

  return it;
}

export default function Game() {
  const container = new Container();
  container.name = 'game';

  const paths = Paths();

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

function state(paths: Container, pokers: Container, scoresGroup: Container) {
  let pre = Hands();
  let scores = Scores();

  function getPath(id: SEAT) {
    const path = paths.getChildByName(String(id)) as Path;

    const target = config[id];

    const offsetX = -100;
    const nextX = 50;

    const end = {
      x: target.x + offsetX + nextX * (pre[id].length - 1),
      y: target.y,
    };

    path.points = [dealPoint, end];

    return path;
  }

  return async function update(hands: Hand[]) {
    //
    if (hands.length === 0) {
      pre = Hands();
      scores = Scores();
      pokers.removeChildren();
      scoresGroup.removeChildren();

      return;
    }

    hands = hands.sort((a, b) => {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;

      if (a.points > b.points) return 1;
      if (a.points < b.points) return -1;

      return 0;
    });

    for (const { id, card, points } of hands) {
      const { suit, rank } = card;

      const poker = new Poker(suit, rank);

      pokers.addChild(poker);

      pre[id].push(card);
      scores[id] = Math.max(scores[id], points);

      await getPath(id).attach(poker);
    }

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
