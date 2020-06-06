import Background from './Background';
import Seat from './Seat';
import Element from '../core/Element';
import { Children } from '../core';
import Poker from './Poker';
import Path from './Path';

export default class Main extends Element {
  //
  get view() {
    return {
      background: new Background(),
      seatA: new Seat(),
      seatB: new Seat(),
      seatC: new Seat(),
      seatD: new Seat(),
      seatE: new Seat(),
      poker: new Poker('CLUB', 10),
      path: new Path([
        { x: 0, y: 0 },
        [
          { x: -100, y: 200 },
          { x: -200, y: 200 },
        ],
        { x: -1000, y: 700 },
      ]),
    };
  }

  onCreate({ background, seatA, seatB, seatC, seatD, seatE, poker, path }: Children) {
    const { width, height } = background as Element;

    // Seat A ~ E, from left to right
    seatA.x = width * (15 / 100);
    seatA.y = height * (58 / 100);

    seatB.x = width * (30 / 100);
    seatB.y = height * (75 / 100);

    seatC.x = width * (50 / 100);
    seatC.y = height * (82 / 100);

    seatD.x = width * (70 / 100);
    seatD.y = height * (75 / 100);

    seatE.x = width * (85 / 100);
    seatE.y = height * (58 / 100);

    poker.x = width * (50 / 100);
    poker.y = height * (50 / 100);

    path.x = width * (85 / 100);
    path.y = height * (10 / 100);

    (path as Path).attach(poker);
  }
}
