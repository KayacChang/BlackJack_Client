import Background from './components/Background';
import Seat from './components/Seat';
import { Element, Children } from '../core';
import Game from './Game';

function Test(constructorFunction: Function) {
  console.log('-- decorator function invoked --');
}

@Test
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

    return {
      background: new Background(),

      ...seats,

      game: new Game(),
    };
  }

  onCreate({ background, seatA, seatB, seatC, seatD, seatE }: Children) {
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

    this.interactive = true;
    this.on('pointermove', (event: PIXI.interaction.InteractionEvent) => {
      const pos = this.toLocal(event.data.global);

      console.log(pos);
    });
  }
}
