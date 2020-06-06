import Background from './Background';
import Seat from './Seat';
import Element from '../core/Element';
import { Children } from '../core';
import Poker from './Poker';
import Path from './Path';
import { mapObjIndexed } from 'ramda';

type Point = {
  x: number;
  y: number;
};

export default class Main extends Element {
  //
  get view() {
    const seats = {
      seatA: new Seat(),
      seatB: new Seat(),
      seatC: new Seat(),
      seatD: new Seat(),
      seatE: new Seat(),
    };

    const points = {
      pathA: [
        { x: 2515, y: 160 },
        { x: 443, y: 630 },
      ],
      pathB: [
        { x: 2515, y: 160 },
        { x: 888, y: 880 },
      ],
      pathC: [
        { x: 2515, y: 160 },
        { x: 1480, y: 980 },
      ],
      pathD: [
        { x: 2515, y: 160 },
        { x: 2072, y: 880 },
      ],
      pathE: [
        { x: 2515, y: 160 },
        { x: 2515, y: 630 },
      ],
    };

    const paths = mapObjIndexed((data: Point[]) => new Path(data), points);

    return {
      background: new Background(),

      ...seats,

      poker: new Poker('CLUB', 10),

      ...paths,
    };
  }

  onCreate({ background, seatA, seatB, seatC, seatD, seatE, poker, pathC, pathD }: Children) {
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

    (pathC as Path).attach(poker);

    this.interactive = true;
    this.on('pointermove', (event: PIXI.interaction.InteractionEvent) => {
      const pos = this.toLocal(event.data.global);

      console.log(pos);
    });
  }
}
